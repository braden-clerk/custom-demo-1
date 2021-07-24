import styles from '../../styles/SignIn.module.css';
import BasicModal from '../../components/BasicModal';
import { useSignUp, useClerk } from '@clerk/clerk-react';
import { useState }  from 'react';
import { useRouter } from 'next/router'

const VerifyPage = () => {
  const su = useSignUp()
  const uc = useClerk()

  const [verCode, setVerCode] = useState('')
  const [codeError, setCodeError] = useState('')
  
  const router = useRouter()

  const doVerify = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault()
    setCodeError('')
    try {
      const currSignUp = await su.attemptEmailAddressVerification({code: verCode})
      await uc.setSession(currSignUp.createdSessionId, () => {
        router.push('/')
      })
    } catch(err) {
      const ckErr = err.errors[0]
      setCodeError(ckErr.message)
    }
  }
  
  return <BasicModal>
    <div>
      <h1>Please verify your email</h1>
      <h4>custom login demo</h4>
    </div>
    <br/>    
    <br/>
    <form onSubmit={doVerify}>
      <input
        autoFocus
        type="text"
        value={verCode}
        placeholder="Verification code"
        onChange={e => { setVerCode(e.currentTarget.value); }}
      />
      <span className={styles.emailError}>{codeError}</span>
      <button className={styles.item}>Next</button>
    </form>
  </BasicModal>
};

export default VerifyPage;
