import * as React from 'react';
import classNames from 'classnames';

export default function SignupBox(props) {
    const { className } = props;
    return (
        <div className={classNames('bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg w-full max-w-sm', className)}>
            <h3 className="text-xl font-semibold mb-2">Get Threat Alerts</h3>
            <p className="text-sm mb-4">Sign up for email alerts on new intelligence reports.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="you@company.com" className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none" />
                <button className="px-4 py-2 rounded-md bg-light text-dark font-semibold">Subscribe</button>
            </form>
            <small className="block mt-3 text-xs opacity-75">We respect your privacy. Unsubscribe anytime.</small>
        </div>
    );
}
