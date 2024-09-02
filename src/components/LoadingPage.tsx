import { HashLoader } from 'react-spinners'

function LoadingPage() {
  return (
    <div className='h-screen w-screen bg-zinc-950 grid place-items-center'>
        <HashLoader
        color="#c2c2c2"
        size={300}
        />
    </div>
  )
}

export default LoadingPage
