const Benchmark = require('benchmark');
const { processDataset } = require('../src/data_processor');

// Sample data generators
function generateUser(id) {
  const departments = ['engineering', 'marketing', 'sales', 'support', 'design'];
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson'];
  
  return {
    id,
    name: names[id % names.length] + ` ${id}`,
    email: `user${id}@example.com`,
    age: 22 + (id % 43), // Ages 22-64
    department: departments[id % departments.length],
    salary: 40000 + (id % 80000) // Salaries 40k-120k
  };
}

function generateDataset(size) {
  return Array.from({ length: size }, (_, i) => generateUser(i + 1));
}

// Performance measurement utilities
function measureMemory() {
  if (global.gc) {
    global.gc();
  }
  return process.memoryUsage().heapUsed;
}

function measureTime(fn) {
  const start = process.hrtime.bigint();
  const result = fn();
  const end = process.hrtime.bigint();
  const timeMs = Number(end - start) / 1000000; // Convert nanoseconds to milliseconds
  return { result, timeMs };
}

// Benchmark configurations
const benchmarkConfigs = [
  { name: 'Small Dataset', size: 1000, budget: 10 },
  { name: 'Medium Dataset', size: 10000, budget: 100 },
  { name: 'Large Dataset', size: 100000, budget: 1000 }
];

// Individual function benchmarks
function benchmarkValidation() {
  console.log('\n=== Validation Benchmark ===');
  
  benchmarkConfigs.forEach(config => {
    const dataset = generateDataset(config.size);
    const memBefore = measureMemory();
    
    const { timeMs } = measureTime(() => {
      // This will test the validation function when implemented
      return processDataset(dataset, { skipTransformation: true, skipAggregation: true });
    });
    
    const memAfter = measureMemory();
    const memUsed = (memAfter - memBefore) / 1024 / 1024; // MB
    const recordsPerSec = Math.round(config.size / (timeMs / 1000));
    
    console.log(`${config.name} (${config.size.toLocaleString()} records):`);
    console.log(`  Time: ${timeMs.toFixed(2)}ms (budget: ${config.budget}ms)`);
    console.log(`  Memory: ${memUsed.toFixed(2)}MB`);
    console.log(`  Throughput: ${recordsPerSec.toLocaleString()} records/sec`);
    console.log(`  Status: ${timeMs <= config.budget ? '✅ PASS' : '❌ FAIL'}`);
    console.log('');
  });
}

function benchmarkTransformation() {
  console.log('\n=== Transformation Benchmark ===');
  
  benchmarkConfigs.forEach(config => {
    const dataset = generateDataset(config.size);
    const memBefore = measureMemory();
    
    const { timeMs } = measureTime(() => {
      return processDataset(dataset, { skipValidation: true, skipAggregation: true });
    });
    
    const memAfter = measureMemory();
    const memUsed = (memAfter - memBefore) / 1024 / 1024;
    const recordsPerSec = Math.round(config.size / (timeMs / 1000));
    
    console.log(`${config.name} (${config.size.toLocaleString()} records):`);
    console.log(`  Time: ${timeMs.toFixed(2)}ms (budget: ${config.budget}ms)`);
    console.log(`  Memory: ${memUsed.toFixed(2)}MB`);
    console.log(`  Throughput: ${recordsPerSec.toLocaleString()} records/sec`);
    console.log(`  Status: ${timeMs <= config.budget ? '✅ PASS' : '❌ FAIL'}`);
    console.log('');
  });
}

function benchmarkAggregation() {
  console.log('\n=== Aggregation Benchmark ===');
  
  benchmarkConfigs.forEach(config => {
    const dataset = generateDataset(config.size);
    const memBefore = measureMemory();
    
    const { timeMs } = measureTime(() => {
      return processDataset(dataset, { skipValidation: true, skipTransformation: true });
    });
    
    const memAfter = measureMemory();
    const memUsed = (memAfter - memBefore) / 1024 / 1024;
    const recordsPerSec = Math.round(config.size / (timeMs / 1000));
    
    console.log(`${config.name} (${config.size.toLocaleString()} records):`);
    console.log(`  Time: ${timeMs.toFixed(2)}ms (budget: ${config.budget}ms)`);
    console.log(`  Memory: ${memUsed.toFixed(2)}MB`);
    console.log(`  Throughput: ${recordsPerSec.toLocaleString()} records/sec`);
    console.log(`  Status: ${timeMs <= config.budget ? '✅ PASS' : '❌ FAIL'}`);
    console.log('');
  });
}

function benchmarkFullPipeline() {
  console.log('\n=== Full Pipeline Benchmark ===');
  
  benchmarkConfigs.forEach(config => {
    const dataset = generateDataset(config.size);
    const memBefore = measureMemory();
    
    const { result, timeMs } = measureTime(() => {
      return processDataset(dataset);
    });
    
    const memAfter = measureMemory();
    const memUsed = (memAfter - memBefore) / 1024 / 1024;
    const recordsPerSec = Math.round(config.size / (timeMs / 1000));
    
    console.log(`${config.name} (${config.size.toLocaleString()} records):`);
    console.log(`  Time: ${timeMs.toFixed(2)}ms (budget: ${config.budget}ms)`);
    console.log(`  Memory: ${memUsed.toFixed(2)}MB (budget: 50MB)`);
    console.log(`  Throughput: ${recordsPerSec.toLocaleString()} records/sec`);
    console.log(`  Memory Status: ${memUsed <= 50 ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  Time Status: ${timeMs <= config.budget ? '✅ PASS' : '❌ FAIL'}`);
    
    if (result && result.performance) {
      console.log(`  Breakdown:`);
      console.log(`    Validation: ${result.performance.validationTime}ms`);
      console.log(`    Transformation: ${result.performance.transformationTime}ms`);
      console.log(`    Aggregation: ${result.performance.aggregationTime}ms`);
    }
    console.log('');
  });
}

// Detailed Benchmark Suite using Benchmark.js
function runBenchmarkSuite() {
  console.log('\n=== Detailed Benchmark Suite ===');
  
  const suite = new Benchmark.Suite;
  const smallDataset = generateDataset(1000);
  const mediumDataset = generateDataset(10000);
  
  suite
    .add('Small Dataset (1K)', function() {
      processDataset(smallDataset);
    })
    .add('Medium Dataset (10K)', function() {
      processDataset(mediumDataset);
    })
    .add('Validation Only (10K)', function() {
      processDataset(mediumDataset, { skipTransformation: true, skipAggregation: true });
    })
    .add('Transformation Only (10K)', function() {
      processDataset(mediumDataset, { skipValidation: true, skipAggregation: true });
    })
    .add('Aggregation Only (10K)', function() {
      processDataset(mediumDataset, { skipValidation: true, skipTransformation: true });
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    });
    
  return suite;
}

// Main execution
async function runBenchmarks() {
  console.log('🚀 Data Processor Performance Benchmark');
  console.log('==========================================');
  
  try {
    // Check if the implementation exists
    if (typeof processDataset !== 'function') {
      console.log('❌ processDataset function not implemented yet');
      console.log('📝 Please implement the function in src/data_processor.js');
      return;
    }
    
    // Run performance tests
    benchmarkValidation();
    benchmarkTransformation();
    benchmarkAggregation();
    benchmarkFullPipeline();
    
    // Run detailed benchmark suite
    const suite = runBenchmarkSuite();
    suite.run({ async: true });
    
  } catch (error) {
    console.error('❌ Benchmark failed:', error.message);
    console.log('💡 Make sure to implement all required functions in src/data_processor.js');
  }
}

// Export for testing
module.exports = {
  generateDataset,
  measureTime,
  measureMemory,
  runBenchmarks
};

// Run if called directly
if (require.main === module) {
  runBenchmarks();
}