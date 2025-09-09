import admin from 'firebase-admin';

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  const serviceAccount = (await import(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, { assert: { type: 'json' } })).default;
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
} else {
  console.error('Missing Firebase service account configuration.');
  process.exit(1);
}

export const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.*)$/);
  const idToken = match ? match[1] : null;

  if (!idToken) return res.status(401).json({ message: 'Missing Firebase ID token' });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = {
      uid: decoded.uid,
      email: decoded.email || null,
      phone: decoded.phone_number || null,
      name: decoded.name || null
    };
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export { admin };
