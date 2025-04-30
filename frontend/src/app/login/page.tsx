/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleAuth = async (type: 'login' | 'register') => {
		const url = `http://localhost:3050/auth/${type}`;
		const payload =
			type === 'register'
				? { email, username, password }
				: { email, password };

		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			console.log(data);

			if (!res.ok) throw new Error(data.message || 'Ошибка авторизации');

			toast.success(
				`Успешно: ${type === 'login' ? 'вход' : 'регистрация'}`
			);
			router.push('/progress');
		} catch (err: any) {
			setErrorMessage(err.message);
			setShowError(true);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
				<Tabs defaultValue="login" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Войти</TabsTrigger>
						<TabsTrigger value="register">Регистрация</TabsTrigger>
					</TabsList>

					<TabsContent value="login">
						<div className="space-y-4 mt-4">
							<Input
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								placeholder="Пароль"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button
								className="w-full"
								onClick={() => handleAuth('login')}>
								Войти
							</Button>
						</div>
					</TabsContent>

					<TabsContent value="register">
						<div className="space-y-4 mt-4">
							<Input
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								placeholder="Имя пользователя"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<Input
								placeholder="Пароль"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button
								className="w-full"
								onClick={() => handleAuth('register')}>
								Зарегистрироваться
							</Button>
						</div>
					</TabsContent>
				</Tabs>
			</div>

			<Dialog open={showError} onOpenChange={setShowError}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ошибка</DialogTitle>
					</DialogHeader>
					<div className="text-red-600 text-sm">{errorMessage}</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
