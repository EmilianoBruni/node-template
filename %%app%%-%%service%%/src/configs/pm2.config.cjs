// env_development e env_production non funzionano con le instances per cui
const app_env_cfg = process.env.NODE_ENV == 'development' 
    ? { exec_mode: "fork", instances: 1, watch: true}
    : {};

module.exports = {
    apps: [
        {
            name: "apimac-www",
            script: "dist/server.js",
            autorestart: true,
            max_memory_restart: "1G",
            exec_mode: "cluster",
            instances: 4,
            watch: false,
            ...app_env_cfg
        }
    ],
};

