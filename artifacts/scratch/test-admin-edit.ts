import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log('1. Fetching a published post from local API...');
  const res = await fetch('http://localhost:3000/api/blogs?where[_status][equals]=published&limit=1');
  const data = await res.json();
  
  if (!data.docs || data.docs.length === 0) {
    throw new Error('No published blogs found.');
  }

  const post = data.docs[0];
  const newTitle = `Admin Edit Title ${Date.now()}`;
  console.log(`2. Found post: ${post.slug}. Simulating Admin UI edit (PATCH) to title: ${newTitle}`);

  // We need to authenticate for the PATCH request, or override Access.
  // Wait, the REST API requires a token! Let's login first.
  
  const loginRes = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@writtenlyhub.com', // Need to know the admin email
      password: 'password' // Assuming this is the seed password
    })
  });
  
  const loginData = await loginRes.json();
  if (!loginData.token) {
    console.log('Login failed, cannot test via REST API. Error:', loginData);
    return;
  }
  const token = loginData.token;

  console.log('3. Logged in successfully. Sending PATCH request...');
  
  const patchRes = await fetch(`http://localhost:3000/api/blogs/${post.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    body: JSON.stringify({
      title: newTitle,
    })
  });

  const patchData = await patchRes.json();
  console.log('4. PATCH response status:', patchRes.status);
  
  if (patchRes.status !== 200) {
    console.error('PATCH failed:', patchData);
    return;
  }

  console.log('5. Waiting 2 seconds for revalidation webhook...');
  await new Promise(r => setTimeout(r, 2000));

  console.log(`6. Fetching live frontend page for slug: ${post.slug}`);
  const liveRes = await fetch(`http://localhost:3000/blog/${post.slug}`);
  const html = await liveRes.text();
  
  if (html.includes(newTitle)) {
    console.log('7. SUCCESS! Live page reflects the edit.');
  } else {
    console.log('7. FAILURE! Live page does not reflect the edit.');
  }
}

run().catch(console.error);
