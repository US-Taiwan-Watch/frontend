const showProdContent = false;

export const showDevContent = process.env.NODE_ENV && !showProdContent;

