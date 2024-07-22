import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if(!user) {
      router.push('/login')
    } else {
      router.push('dashboard')
    }
  }, [user, router])

  return null
}
