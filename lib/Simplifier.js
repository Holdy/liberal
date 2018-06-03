
const WHITESPACE_HYPHENS_UNDERSCORES = /[-_\s]/g;

function simplifyText(text) {
    return text.toLowerCase().replace(WHITESPACE_HYPHENS_UNDERSCORES, '');
}

module.exports.simplifyText = simplifyText;
