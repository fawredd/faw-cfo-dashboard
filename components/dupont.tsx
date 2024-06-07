import { promises as fs } from 'fs';

export default async function Dupont(){
    const file = await fs.readFile(process.cwd() + '/lib/sos-contador/indiceDupont.csv', 'utf8').then(res=>res);
    return (
        <p> {file} </p>
    )
}