module.exports = {
  apps: [{
    name: 'a1',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 4000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    }
  }]
};