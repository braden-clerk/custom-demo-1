import styles from '../../styles/SignIn.module.css';
import BasicModal from '../../components/BasicModal';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { useState }  from 'react';
import { useRouter } from 'next/router'

const SignInPage = () => { 
  const [email, setEmail] = useState('');
  const [signInError, setSignInError] = useState('');
  const si = useSignIn()
  const su = useSignUp()
  const router = useRouter()

  const doNext = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()
    try {
      await si.create({identifier: email})
    } catch(err) {
      const ckErr = err.errors[0]
      if (ckErr.code === "form_identifier_not_found") {
          await su.create({emailAddress: email})
          router.push('/register')
      } else {
        setSignInError(ckErr.message)
      }
      return
    }
    
    router.push('/log-in/complete')
  }
  
  return <BasicModal>
    <div>
      <h1>Welcome</h1>
      <h4>custom login demo</h4>
    </div>
    <br/>
    <br/>
    <form onSubmit={doNext}>
      <input
        autoFocus
        type="text"
        value={email}
        placeholder="Email address"
        onChange={e => { setEmail(e.currentTarget.value); }}
      />
      <div className={styles.emailError}>{signInError}</div>
      <button className={styles.item}>Next</button>
    </form>
  </BasicModal>
};

export default SignInPage;
