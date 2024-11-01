import jwt
import time

# Set your credentials
team_id = "YOUR_TEAM_ID"
client_id = "YOUR_CLIENT_ID"  # The Service ID
key_id = "YOUR_KEY_ID"  # Key ID for the .p8 file
private_key = """-----BEGIN PRIVATE KEY-----
...your .p8 file content here...
-----END PRIVATE KEY-----"""

# Generate the JWT
current_time = int(time.time())
headers = {
    "kid": key_id,
    "alg": "ES256"
}
payload = {
    "iss": team_id,
    "iat": current_time,
    "exp": current_time + 86400 * 180,  # Expire in 6 months
    "aud": "https://appleid.apple.com",
    "sub": client_id
}

token = jwt.encode(payload, private_key, algorithm="ES256", headers=headers)

print("Your client secret JWT:", token)
