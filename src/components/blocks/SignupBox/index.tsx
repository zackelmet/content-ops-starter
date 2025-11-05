import * as React from 'react';
import classNames from 'classnames';

export default function SignupBox(props) {
    const { className } = props;
    return (
        <div className={classNames('bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-lg w-full', className)}>
            <h3 className="text-xl font-semibold mb-2">Get Threat Alerts</h3>
            <p className="text-sm mb-4">Sign up for email alerts on new intelligence reports.</p>
            {/* MailerLite Embedded Form */}
            <div className="ml-embedded" data-form="JJy1nd"></div>
        </div>
    );
}
