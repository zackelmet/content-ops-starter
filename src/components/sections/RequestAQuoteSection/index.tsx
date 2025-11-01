import * as React from 'react';
import classNames from 'classnames';
import Section from '../Section';
import TitleBlock from '../../blocks/TitleBlock';

export default function RequestAQuoteSection(props) {
    const { elementId, colors = 'bg-light-fg-dark', headline, description, features = [], form = {}, styles = {} } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-contact-section"
            colors={colors}
            styles={styles?.self}
        >
            <div className={classNames('w-full', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-8', 'items-start')}>
                <div className={classNames('w-full', 'max-w-sectionBody', 'text-left', 'text-light')}>
                    {headline && (
                        <TitleBlock
                            text={headline}
                            color="text-dark"
                            type="TitleBlock"
                            className="pt-2 pb-2 mb-4"
                        />
                    )}
                    {description && (
                        <p className="mt-4 text-lg sm:text-xl">{description}</p>
                    )}
                    {features && features.length > 0 && (
                        <ul className="mt-6 mb-8 space-y-3">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-base text-blue-800">
                                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Form box styled like ContactSection */}
                <div className="w-full">
                    <div className="w-full border border-white/6 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-blue-900 mb-2">{form.title}</h2>
                        <p className="text-base text-gray-700 mb-4">{form.description}</p>
                        <form className="grid gap-4">
                            {form.fields && form.fields.map((field, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <label className="font-semibold text-blue-900 mb-1" htmlFor={field.name}>{field.label}{field.isRequired ? ' *' : ''}</label>
                                    {field.type === 'TextareaFormControl' ? (
                                        <textarea id={field.name} name={field.name} required={field.isRequired} className="border border-gray-300 rounded-lg p-2 min-h-[80px]" />
                                    ) : (
                                        <input id={field.name} name={field.name} type={field.type === 'EmailFormControl' ? 'email' : 'text'} required={field.isRequired} className="border border-gray-300 rounded-lg p-2" />
                                    )}
                                </div>
                            ))}
                            <button type="submit" className="mt-2 py-3 px-6 bg-blue-900 text-white font-bold rounded-lg shadow hover:bg-blue-800 transition-all">
                                {form.submitButton?.label || 'Request a Quote'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    );
}
