const NodeRSA = require('node-rsa');



const key = new NodeRSA();

a = "-----BEGIN RSA PRIVATE KEY-----\
MIIBOwIBAAJBAIQvtJKwi42MZHzDjHyYZDTjJHTp4U524auVtqd2OYOUzuVuQNlp\
OuukD+pWLMoGixE9jCzwRFllxZSdHVZX4KMCAwEAAQJBAIGlHFCG0MhqeqAXVrFY\
8WchpD76qBzB4kHcm4GRJYWTvAjw6aEHB6wPnxVZ5RmgC1e2EMEpUlfmLNSuxrhX\
aoECIQDhzbm5/rwv34kdTkbLp5myIkVsVoybr1inCRYcwZ8L4wIhAJXdCg/x8dGV\
aOnmQEUgKI4bN1IrsyMHnsUe4hYgkXRBAiBNAWnLYnIvKV6LXfyKy3eA5msijUma\
dmwXWuPtnqJs3QIgE+o0vRu0u9oz/+kmH0l/uiqptlSyUHRhx+Yruy8GxUECIQDO\
UMIEItHHPZdt9nsbvMzMEyYd+TxRmvxkPkCNftximA==\
-----END RSA PRIVATE KEY-----"
b = "-----BEGIN RSA PUBLIC KEY-----\
MEgCQQCEL7SSsIuNjGR8w4x8mGQ04yR06eFOduGrlbandjmDlM7lbkDZaTrrpA/q\
VizKBosRPYws8ERZZcWUnR1WV+CjAgMBAAE=\
-----END RSA PUBLIC KEY-----"

const text = 'Hello RSA!';
key.importKey(a, 'pkcs1-private-pem')
key.importKey(b, 'pkcs1-public-pem')

const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);