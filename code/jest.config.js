module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest'
        },
    //collectCoverage: true,
    testPathIgnorePatterns: ["/node_modules/", "/dst/"],
};