import supabase from '@/config/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';


export default function Home() {

const router = useRouter();
  const nameRef = useRef();
  const emailRef = useRef(); 

  async function test(){
    const Email=emailRef.current.value;
    const Name=nameRef.current.value;
    const Password= encryptedMsg;
  
    const { data, error } = await supabase
    .from('user')
    .insert([
    { email: Email, name: Name, password: Password },
     ])
    .select()

    router.push('/test')
  }

  const [msg, setMsg] = useState('');
  const [encryptedMsg, setEncryptedMsg] = useState('');
  const [decryptedMsg, setDecryptedMsg] = useState('');

  const p = 61; // Predefined prime number p
  const q = 53; // Predefined prime number q

  useEffect(() => {
    handleEncryption();
  }, [msg]); // Run encryption whenever the message changes

  const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    return 1;
  };

  const handleEncryption = () => {
    const n = p * q;
    const t = (p - 1) * (q - 1);
    const e = 7; // Choosing public exponent (a common choice for simplicity)
    const d = modInverse(e, t);

    const m = [];
    for (let i = 0; i < msg.length; i++) {
      m.push(msg.charCodeAt(i));
    }

    const encrypted = [];
    const decrypted = [];

    for (let i = 0; i < m.length; i++) {
      const encryptedChar = BigInt(m[i]) ** BigInt(e) % BigInt(n);
      encrypted.push(encryptedChar);
      const decryptedChar = BigInt(encryptedChar) ** BigInt(d) % BigInt(n);
      decrypted.push(Number(decryptedChar));
    }

    setEncryptedMsg(encrypted.join(' '));
    setDecryptedMsg(String.fromCharCode(...decrypted)); // Convert Unicode values to characters
  };

  
  return (
    <>
    <h1>Name:</h1>
    <input type='text' ref={nameRef}/>
    <h1>Email:</h1>
    <input type='email' ref={emailRef}/>
    <h1>Password:</h1>
    <input type='password' value={msg} onChange={(e) => setMsg(e.target.value)}/>
    <button onClick={test}>click</button>
    </>
  )
}
// export async function getStaticProps() {
//   let {data, error} =  await supabase .from('user').select()
//   return { props: { 
//     data,
//    } }
// }
