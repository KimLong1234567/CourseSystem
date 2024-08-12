import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function LogInPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		// Handle form submission
	};

	return (
		<>
			<header className="p-4">
				<div className="flex items-center space-x-2">
					<FontAwesomeIcon icon={faArrowLeft} className="text-gray-600" />
					<Link to="/" className="text-gray-600 font-medium hover:underline">
						Homepage
					</Link>
				</div>
			</header>
			<main className="flex justify-center items-center h-screen bg-gray-100">
				<div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
					<div
						className="w-1/2 p-8"
						style={{
							backgroundImage: `url('your-image-url')`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<h1 className="text-3xl font-bold text-white">
							Selangkah Lebih Dekat Dengan Impianmu
						</h1>
						<p className="mt-4 text-white">
							Sebuah layanan E-Learning gratis yang siap membantumu menjadi
							seorang ahli
						</p>
					</div>
					<div className="w-1/2 p-8 bg-blue-900 text-white">
						<h2 className="text-2xl font-bold">Login</h2>
						<p className="mt-4">
							Persiapkan diri untuk masa depan yang penuh dengan bintang
						</p>
						<form onSubmit={handleSubmit(onSubmit)} className="mt-6">
							<div className="mb-4">
								<label htmlFor="email" className="block text-sm font-medium">
									Email
								</label>
								<input
									type="email"
									id="email"
									{...register("email", { required: "Email is required" })}
									className="w-full px-4 py-2 mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.email && (
									<span className="text-red-500 text-sm">
										{errors.email.message}
									</span>
								)}
							</div>
							<div className="mb-4">
								<label htmlFor="password" className="block text-sm font-medium">
									Password
								</label>
								<input
									type="password"
									id="password"
									{...register("password", {
										required: "Password is required",
									})}
									className="w-full px-4 py-2 mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								{errors.password && (
									<span className="text-red-500 text-sm">
										{errors.password.message}
									</span>
								)}
							</div>
							<div className="flex items-center mb-4">
								<input
									type="checkbox"
									id="rememberMe"
									{...register("rememberMe")}
									className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
								/>
								<label htmlFor="rememberMe" className="ml-2 text-sm">
									Simpan info masuk
								</label>
							</div>
							<button
								type="submit"
								className="w-full py-2 px-4 text-sm font-medium text-blue-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								Masuk
							</button>
						</form>
						<p className="mt-4 text-sm">
							Sudah punya akun?{" "}
							<Link to="/register" className="text-yellow-400 hover:underline">
								Daftar
							</Link>
						</p>
					</div>
				</div>
			</main>
		</>
	);
}

export default LogInPage;
