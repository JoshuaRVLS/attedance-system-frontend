import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useSocketIO from '../contexts/SocketIOContext'
import { Student } from '../types/student';
import axios from 'axios';
import { Howl } from 'howler';

const LatestScannedStudent = () => {
    const { lastStudent, setLastStudent } = useSocketIO()!;
    const [studentData, setStudentData] = useState<Student | null>(null);

    useEffect(() => {
        (async () => {
            if (lastStudent) {
                const sound = new Howl({
                    src: ['/sounds/notification.wav'],
                    loop: false
                });
                sound.play();
                const response = await axios.get(`http://192.168.100.7:8000/api/v1/students/${lastStudent}`);
                setStudentData(response.data);
            }
        })();
    }, [lastStudent, setLastStudent])

    return (
        <div className='relative font-montserrat pt-8 flex shadow-lg rounded-lg border border-secondary items-center flex-col min-h-[80dvh] min-w-96 max-w-[40rem]'>
            {!studentData ? (
                <div className='p-2 font-montserrat font-semibold text-2xl items-center flex'>
                    <span>Scanned Student will be shown here.</span>
                </div>
            ) : (
                <div className='flex w-full flex-col items-center'>
                    <Image alt='student_photo' className='object-fill size-[35rem] m-3 rounded-xl' src={`data:${studentData?.photo.mimetype};base64,${Buffer.from(studentData!.photo.data).toString('base64')}`} width={50} height={50} />
                    <div className='flex flex-col items-center justify-between gap-16'>
                        <div className='flex flex-col items-center'>
                            <span className='font-semibold text-2xl capitalize'>{studentData.firstName} {studentData.lastName}</span>
                            <small className='font-light'>{studentData.class.value}</small>
                        </div>
                        <div>
                            <span className='shadow-xl bg-primary p-2 rounded-full'>Hadir pada {new Date(studentData.updatedAt).toLocaleString('id-ID', {dateStyle: 'full', timeStyle: 'long'})}</span>
                        </div>
                    </div>
                    
                </div>
            )}
            <div className='absolute -top-7 p-4 rounded-lg border-secondary border shadow-lg bg-primary font-montserrat font-semibold'>
                Scanned Student
            </div>
        </div>
  )
}

export default LatestScannedStudent