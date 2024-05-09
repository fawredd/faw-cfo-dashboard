
import performLoginSos from "@/lib/sos-contador/sos-login"
export default async function KeyMetrics(data:any){
const data2 = await performLoginSos(env.CUIT)    
return (
    <>
        <div>
            <p>1-------------</p>
            {JSON.stringify(data)}
        </div>
        <div>
            <p>2-------------</p>
            {JSON.stringify(data2)}
        </div>
    </>
    )
}