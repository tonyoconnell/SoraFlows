'use client'
import Image from 'next/image'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { LocaleDictionary } from '@/types/locale'
import { useRouter } from 'next/navigation'

export default function MainContent({ dictionary }: LocaleDictionary) {
    const router = useRouter(); // 使用 useRouter 钩子
    const [email, setEmail] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false); // 新状态控制动画显示

    useEffect(() => {
        // 使用 useEffect 确保下面的逻辑在客户端执行
        console.log('Router path:', router);
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 检查邮箱输入是否为空（或只包含空格）
        // 简单的邮箱格式验证
        const emailRegex = /\S+@\S+\.\S+/;
        const isValidEmail = emailRegex.test(email);

        if (email.trim() === '' || !emailRegex.test(email)) {
            // 如果邮箱不符合格式，则显示提示且不跳转
            setShowPrompt(true); // 显示提示信息
            setShowAnimation(true); // 激活动画
            setTimeout(() => setShowAnimation(false), 1500); // 1.5秒后移除动画效果
            return; // 阻止表单提交和页面跳转
        }else {
            console.log('Form submitted with email:', email);
            // 在这里添加异步操作，如 API 调用
            // 假设有一个异步函数 fetchData() 需要在表单提交时调用
            // await fetchData();
            // 表单提交后跳转
            try {
                await router.push('/studio');
            } catch (error) {
                console.error('Failed to navigate:', error);
            }

        }

    };
    // 用于处理邮箱输入字段的变化
    const handleEmailChange = (e) => {
        setEmail(e.target.value); // 更新 email 状态，存储输入的值
        // 用户开始输入时隐藏提示
        setShowPrompt(false); // 隐藏提示信息
        setShowAnimation(false); // 如果想要在用户输入时也立即停止任何动画效果，可以加上这行
    };
    
    
    // useEffect(() => {
    //     // 当邮箱输入为空时显示提示，否则不显示
    //     setShowPrompt(email.trim() === '');
    // }, [email]);


    return (
        <div className="flex flex-col justify-between items-center">
            {/* <Head>

                <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap"
                    rel="stylesheet" />

            </Head> */}
            <div className="py-10">
                <Image src="/logo.png" alt="logo" width={200} height={200} />
            </div>
            {/*<div className=''>*/}
            <h1 className="text-7xl py-8 flex justify-center overflow-visible">
                <span className="wave text-red-500" style={{ animationDelay: '0.1s' }}>S</span>
                <span className="wave text-green-500" style={{ animationDelay: '0.2s' }}>o</span>
                <span className="wave text-blue-500" style={{ animationDelay: '0.3s' }}>r</span>
                <span className="wave text-yellow-500" style={{ animationDelay: '0.4s' }}>a</span>
                <span className="wave text-purple-500" style={{ animationDelay: '0.5s' }}>F</span>
                <span className="wave text-pink-500" style={{ animationDelay: '0.4s' }}>l</span>
                <span className="wave text-indigo-500" style={{ animationDelay: '0.3s' }}>o</span>
                <span className="wave text-orange-500" style={{ animationDelay: '0.2s' }}>w</span>
                <span className="wave text-lime-500" style={{ animationDelay: '0.1s' }}>s</span>
            </h1>

            <p className="text-2xl font-bold">{dictionary.homepage.introduce}</p>
            <p className="text-2xl font-bold">{dictionary.homepage.introduce_2}</p>
            <div className="py-10">
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row justify-center items-center'>
                    {/* <input id="email" placeholder={dictionary.homepage.email_lint} type="email" className="rounded-xl text-xl px-4 py-2" /> */}
                    <input
                        id="email"
                        placeholder={dictionary.homepage.email_lint}
                        type="email"
                        className="rounded-xl text-xl px-4 py-2"
                        value={email} // 绑定email状态
                        onChange={handleEmailChange} // 确保更新email状态
                    />
                    <button type="submit" className="text-xl text-white rounded-xl bg-[#0c8ce9] hover:bg-[#0c8ce9] hover:scale-105 transform-gpu transition px-4 py-2">
                        {dictionary.homepage.submit}
                    </button>
                    {showPrompt && <p className={`text-red-500 ${showAnimation ? 'animate-pulse' : ''}`}>{dictionary.attention.input_email}</p>}
                </form>
            </div>
            <style jsx>{`
                .wave {
                    display: inline-block;
                    font-family: serif;
                    transition: transform 0.5s ease;
                    animation: wave-animation 0.5s ease forwards;
                }

                .wave:hover {
                    transform: scale(1.2);
                }

                @keyframes wave-animation {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px) scale(1.2);
                    }
                    100% {
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>

    )
}