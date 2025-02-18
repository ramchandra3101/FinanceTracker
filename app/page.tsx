import Image from "next/image";
import AuthContainer from "@/components/AuthContainer";
import Background from "@/public/Background/Background.jpg";

export default function Home() {
  return(
    <div className="relative h-screen">
      <Image
        src={Background}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
        <AuthContainer />
    </div>
  
  )
}
