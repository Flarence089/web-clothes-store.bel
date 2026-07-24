import React from 'react'
import {z} from 'zod'
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../styles/LoginPage.module.css'

const formSchema = z.object({
  login:z.string().min(1,'login is incorrect!'),
  password: z.string().min(1,'password must not to be empty')
})

type FormData = z.infer<typeof formSchema>

const LoginPage:React.FC = () => {
  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log('Данные формы',data)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Вход</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className={styles.inputGroup}>
            <input
              {...register('login')}
              type="text"
              placeholder="Логин"
              className={styles.input}
            />
            {errors.login && <p className={styles.errorText}>{errors.login.message}</p>}
          </div>

          <div className={styles.inputGroup}>
            <input
              {...register('password')}
              type="password"
              placeholder="Пароль"
              className={styles.input}
            />
            {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;