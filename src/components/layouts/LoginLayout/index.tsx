import * as React from 'react';
import { getBaseLayoutComponent } from '../../../utils/base-layout';
import dynamic from 'next/dynamic';

const GoogleSignInButton = dynamic(() => import('../../auth/GoogleSignInButton'), { ssr: false });

export default function LoginPage(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout">
                <div className="bg-neutral-fg-dark py-20">
                    <div className="max-w-md mx-auto px-4">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
                            <p className="text-xl text-neutral-300">Sign in to access your vulnerability scanning dashboard</p>
                        </div>
                        
                        <div className="bg-dark-fg-light p-8 rounded-lg border border-neutral-700">
                            <GoogleSignInButton />
                            
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-dark text-neutral-400">Or continue with email</span>
                                </div>
                            </div>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="your.email@company.com"
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary-light transition-colors"
                                >
                                    Sign In
                                </button>
                            </form>
                            
                            <div className="mt-6 text-center text-sm">
                                <p className="text-neutral-400">
                                    Don't have an account? <a href="#" className="text-primary hover:underline">Sign up here</a>
                                </p>
                                <p className="mt-2">
                                    <a href="#" className="text-primary hover:underline">Forgot password?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </BaseLayout>
    );
}
