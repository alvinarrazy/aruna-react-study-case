import React from 'react'
import { Button, Container } from 'react-bootstrap'

interface Props {
    title: String,
    subTitle: String
}

export default function titleer({ title, subTitle = '' }: Props) {
    return (
        <>
            <Container className='p-5 mb-1'>
                <div className='row d-flex justify-content-between align-items-center'>
                    <div className='col'>
                        <h1 className='mb-3'>{title}</h1>
                    </div>
                </div>
                <div className='row d-flex justify-content-between align-items-center'>
                    <div className='col'>
                        <p className='mb-0 text-muted'>{subTitle}</p>
                    </div>
                </div>
                <hr />
            </Container>
        </>
    )
}