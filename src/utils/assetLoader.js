/**
 * Utility to load external scripts and styles dynamically in order.
 * Helpful for legacy vendor scripts that rely on global variables like jQuery.
 */

const loadedResources = new Set();

/**
 * Loads scripts in order.
 * @param {string[]} scripts Array of script source paths
 */
export const loadScripts = (scripts) => {
    return scripts.reduce((promise, src) => {
        return promise.then(() => {
            return new Promise((resolve, reject) => {
                if (loadedResources.has(src)) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = src;
                script.async = false; // Load in order
                script.onload = () => {
                    loadedResources.add(src);
                    resolve();
                };
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.body.appendChild(script);
            });
        });
    }, Promise.resolve());
};

/**
 * Loads stylesheets in order.
 * @param {Array<string|{src: string, id: string}>} styles 
 */
export const loadStyles = (styles) => {
    return styles.reduce((promise, item) => {
        return promise.then(() => {
            return new Promise((resolve, reject) => {
                const src = typeof item === 'string' ? item : item.src;
                const id = typeof item === 'string' ? null : item.id;

                if (loadedResources.has(src) || (id && document.getElementById(id))) {
                    resolve();
                    return;
                }

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = src;
                if (id) link.id = id;

                link.onload = () => {
                    loadedResources.add(src);
                    resolve();
                };
                link.onerror = () => reject(new Error(`Failed to load style: ${src}`));
                document.head.appendChild(link);
            });
        });
    }, Promise.resolve());
};

/**
 * Unloads scripts and styles.
 */
export const unloadScripts = (scripts) => {
    scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
            script.remove();
            loadedResources.delete(src);
        }
    });
};

export const unloadStyles = (styles) => {
    styles.forEach(item => {
        const src = typeof item === 'string' ? item : item.src;
        const id = typeof item === 'string' ? null : item.id;
        const selector = id ? `#${id}` : `link[href="${src}"]`;
        const link = document.querySelector(selector);
        if (link) {
            link.remove();
            loadedResources.delete(src);
        }
    });
};
