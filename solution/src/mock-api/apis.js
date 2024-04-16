/**
 * do not change the implementation
 */
export const isNameValid = (name) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(`name ${name} | name !== 'invalid name' ${name !== 'invalid name'}`);
        resolve(name !== 'invalid name');
    }, Math.random() * 2000);
});

/**
 * do not change the implementation
 */
export const getLocations = () => Promise.resolve(['Canada', 'China', 'USA', 'Brazil']);