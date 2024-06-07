'use server'
import { promises as fs } from 'fs';
export default async function fetchDupont(){
    const file = await fs.readFile(process.cwd() + '/lib/sos-contador/indiceDupont.csv', 'utf8').then(res=>res);
    return await file
 }