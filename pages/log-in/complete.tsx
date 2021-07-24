import styles from '../../styles/SignIn.module.css';
import BasicModal from '../../components/BasicModal';
import { useSignIn, useClerk } from '@clerk/clerk-react';
import { useState }  from 'react';
import { useRouter } from 'next/router'

const CompleteSignInPage = () => {
  const si = useSignIn()
  const uc = useClerk()

  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState('')
  
  const router = useRouter()

  const doVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const currSignUp = await si.attemptFactorOne({strategy: "password", password: password})
      await uc.setSession(currSignUp.createdSessionId, () => {
        router.push('/')
      })
    } catch(err) {
      const ckErr = err.errors[0]
      setPwError(ckErr.message)
    }
  }
  
  return (
    <BasicModal>
    <div>
      <h2>Log in</h2>
    </div>
    <br/>    
    <br/>
    <h4>{si.identifier}</h4>
    <form onSubmit={doVerify}>
      <input
        autoFocus
        type="password"
        value={password}
        placeholder="Password"
        onChange={e => { setPassword(e.currentTarget.value); }}
      />
      <span className={styles.emailError}>{pwError}</span>
      <button className={styles.item}>Log in</button>
    </form>
  </BasicModal>
  )
};

export default CompleteSignInPage;
