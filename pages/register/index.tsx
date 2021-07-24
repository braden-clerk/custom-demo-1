import styles from '../../styles/SignIn.module.css';
import BasicModal from '../../components/BasicModal';
import { useSignUp } from '@clerk/clerk-react';
import { useState }  from 'react';
import { useRouter } from 'next/router'

const SignUpPage = () => {
  const su = useSignUp()

  let initialEmailState = ''
  if (su.emailAddress) {
    initialEmailState = su.emailAddress
  }

  const [email, setEmail] = useState(initialEmailState)
  const [pw, setPassword] = useState('')
  const [signUpError, setSignUpError] = useState('')
  
  const router = useRouter()

  const doSetPassword = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()
    setSignUpError('')
    try {
      await su.update({password: pw})
    } catch(err) {
      const ckErr = err.errors[0]
      setSignUpError(ckErr.message)
      return
    }

    await su.prepareEmailAddressVerification()
    router.push('/register/verify')
  }
  
  return <BasicModal>
    <div>
      <h1>Welcome</h1>
      <h4>custom login demo</h4>
    </div>
    <br/>
    <br/>
    <form onSubmit={doSetPassword}>
      <input
        autoFocus
        type="text"
        value={email}
        placeholder="Email address"
        onChange={e => { setEmail(e.currentTarget.value); }}
      />    
      <input
        autoFocus
        type="password"
        value={pw}
        placeholder="Password"
        onChange={e => { setPassword(e.currentTarget.value); }}
      />    
      <span className={styles.emailError}>{signUpError}</span>
      <button className={styles.item}>Next</button>
    </form>
  </BasicModal>
};

export default SignUpPage;
