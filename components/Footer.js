import Image from "next/image";


export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      height: '100px',
      position: 'fixed',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    }}>
      Created by Wix Spartans <Image height={85} width={60} src="/spartans.png" alt="Netlify Logo"/> for you
    </footer>
  )
}
