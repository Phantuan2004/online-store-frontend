/**
 * Utility to load external scripts dynamically in order.
 * Helpful for legacy vendor scripts that rely on global variables like jQuery.
 */

const loadedScripts = new Set();

export const loadScripts = (scripts) => {
    return scripts.reduce((promise, src) => {
        return promise.then(() => {
            return new Promise((resolve, reject) => {
                if (loadedScripts.has(src)) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = src;
                script.async = false; // Load in order
                script.onload = () => {
                    loadedScripts.add(src);
                    resolve();
                };
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.body.appendChild(script);
            });
        });
    }, Promise.resolve());
};

export const unloadScripts = (scripts) => {
    scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
            script.remove();
            loadedScripts.delete(src);
        }
    });
};
