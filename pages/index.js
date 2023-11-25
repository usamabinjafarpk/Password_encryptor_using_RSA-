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
     if(error){
      alert("Name, Email and Password are required")
     }
     else{
    router.push('/login')

     }
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
    <div style={{backgroundImage:'url(login3.jpg)'}} className='flex justify-center items-center h-screen w-screen bg-no-repeat bg-cover'>
      <div className='bg-transparent backdrop-blur-2xl w-72 h-80 pl-14 pt-14 border border-white rounded-2xl' >
        <h1 className='text-3xl font-bold text-white relative left-11 bottom-4'>Signup</h1>
    <h1 className='text-white'>Name:</h1>
    <input className='rounded-lg bg-slate-400' type='text' ref={nameRef} />
    <h1 className='text-white'>Email:</h1>
    <input className='rounded-lg bg-slate-400' type='email' ref={emailRef}/>
    <h1 className='text-white'>Password:</h1>
    <input className='rounded-lg bg-slate-400 text-white' placeholder='Password' type='password' value={msg} onChange={(e) => setMsg(e.target.value)}/>
    <br></br>
    <button className='bg-slate-300 text-black w-14 rounded-md relative top-5 left-14' onClick={test}>Signup</button>
    </div>
    </div>
    </>
  )
}
