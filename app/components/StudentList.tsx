'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { User } from '@/app/types/student'
import Image from 'next/image';

const StudentList = () => {
  const [students, setStudents] = useState<User[]|null>(null);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/students');
    setStudents(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>{!students ? 'Loading...' : (
      students.map((student: User) => (
        <div key={student.id}>
          <p>{student.firstName}</p>
          <p>{student.lastName}</p>
          {student.photo && (
            <Image width={50} height={50} src={`data:${student.photo.mimetype};base64,${Buffer.from(student.photo.data).toString('base64')}`} alt="student photo" />
          )}
        </div>
      ))
    )}</div>
  )
}

export default StudentList