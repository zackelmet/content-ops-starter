import * as React from 'react';
import classNames from 'classnames';

export default function SignupBox(props) {
    const { className } = props;
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);
        if (!email || !email.includes('@')) {
            setMessage({ type: 'error', text: 'Please enter a valid email.' });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok && data?.success) {
                setMessage({ type: 'success', text: data?.message || 'Thanks — you are subscribed!' });
                setEmail('');
            } else {
                setMessage({ type: 'error', text: data?.message || 'Subscription failed. Please try again.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network error — please try again.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={classNames('bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg w-full', className)}>
            <h3 className="text-xl font-semibold mb-2">Get Threat Alerts</h3>
            <p className="text-sm mb-4">Sign up for email alerts on new intelligence reports.</p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/10 focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-md bg-blue-900 text-dark font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800/30 disabled:opacity-60"
                    aria-label="Get informed"
                >
                    {loading ? 'Sending…' : 'Get Informed'}
                </button>
            </form>
            {message && (
                <div className={classNames('mt-3 text-sm', message.type === 'error' ? 'text-red-300' : 'text-green-300')}>
                    {message.text}
                </div>
            )}
            <small className="block mt-3 text-xs opacity-75">We respect your privacy. Unsubscribe anytime.</small>
        </div>
    );
}
