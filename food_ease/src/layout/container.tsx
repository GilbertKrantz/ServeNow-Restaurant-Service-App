import React, { Children, ReactElement, ReactHTML, ReactNode } from 'react'

interface IContainer {
    children: ReactNode
}

const Container = (props: IContainer) => {
    const { children } = props;
    return (
        <div className='h-screen w-screen bg-[#FFF7D1] flex justify-center items-center'>
            <div className='relative h-[97vh] w-[99vw] flex'>
                <div className='w-[95%] h-full p-[5%]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container