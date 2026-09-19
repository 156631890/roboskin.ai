// Google Dataset distribution.contentUrl identifies the actual download, not its landing page.
// https://developers.google.com/search/docs/appearance/structured-data/dataset#data-download
export function validateDatasetDistributions(value) {
  const errors = [];
  const isText = value => typeof value === 'string' && value.trim().length > 0;
  const isDownloadUrl = value => {
    if (!isText(value)) return false;
    try {
      return ['https:', 'http:'].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  };

  function visit(node, location) {
    if (Array.isArray(node)) {
      node.forEach((item, index) => visit(item, `${location}[${index}]`));
      return;
    }
    if (!node || typeof node !== 'object') return;
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    if (types.includes('Dataset') && Object.hasOwn(node, 'distribution')) {
      const distributions = Array.isArray(node.distribution) ? node.distribution : [node.distribution];
      distributions.forEach((distribution, index) => {
        const label = `${location}.distribution[${index}]`;
        if (!isDownloadUrl(distribution?.contentUrl)) {
          errors.push(`${label}: contentUrl must identify an absolute HTTP(S) download URL`);
        }
        const formats = Array.isArray(distribution?.encodingFormat)
          ? distribution.encodingFormat : [distribution?.encodingFormat];
        if (!formats.length || !formats.every(isText)) {
          errors.push(`${label}: encodingFormat must describe the downloaded file format`);
        }
      });
    }
    Object.entries(node).forEach(([key, child]) => visit(child, `${location}.${key}`));
  }

  visit(value, '$');
  return errors;
}
