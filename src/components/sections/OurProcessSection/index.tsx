import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import TitleBlock from '../../blocks/TitleBlock';
import { Action, Badge } from '../../atoms';

/**
 * OurProcessSection
 * A fresh, blank-slate section that renders a centered title + subtitle and
 * a responsive 1/2/4-up grid of dark cards with cyan text and hover-floating.
 * Designed for process steps: numbered badge, icon slot, title, short copy.
 */
export default function OurProcessSection(props) {
    const { elementId, colors, backgroundImage, badge, title, subtitle, plans = [], styles = {}, enableAnnotations } = props;

    return (
        <Section elementId={elementId} className="sb-component-our-process" colors={colors} backgroundImage={backgroundImage} styles={styles?.self} {...getDataAttrs(props)}>
            <div className={classNames('w-full', 'flex', 'flex-col', 'items-center', 'gap-y-6')}>
                {badge && <Badge {...badge} {...(enableAnnotations && { 'data-sb-field-path': '.badge' })} />}
                {title && (
                    <TitleBlock {...title} className={classNames('w-full', 'max-w-4xl', 'mx-auto', 'mb-2', 'text-center')} {...(enableAnnotations && { 'data-sb-field-path': '.title' })} />
                )}
                {subtitle && (
                    <p className={classNames('w-full', 'max-w-4xl', 'mx-auto', 'text-lg', 'sm:text-xl', 'text-center', 'mb-6')} {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}>
                        {subtitle}
                    </p>
                )}

                <div className="w-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...(enableAnnotations && { 'data-sb-field-path': '.plans' })}>
                        {plans && plans.length > 0 ? (
                            plans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className="fade-in bg-[#071128] text-[#00fed9] rounded-xl p-6 shadow-lg transform-gpu bounce-on-hover"
                                >
                                    <div className="relative h-full flex flex-col">
                                        <div className="absolute -top-5 left-6">
                                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-dark font-bold">{idx + 1}</div>
                                        </div>
                                        <div className="flex-1 pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-md bg-white/6 flex items-center justify-center">
                                                    {/* placeholder icon — using simple inline SVG to avoid new deps */}
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00fed9]">
                                                        <path d="M12 2L19 8V21H5V8L12 2Z" stroke="#00fed9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold leading-tight mb-2">{plan.title}</h3>
                                                    {plan.description && (
                                                        <p className="text-sm mb-3 text-[#aaf7e7]">
                                                            {plan.description}
                                                        </p>
                                                    )}
                                                    {plan.features && plan.features.length > 0 && (
                                                        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                                                            {plan.features.map((f, i) => (
                                                                <li key={i}>{f}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-sm text-[#9fefe0]">No steps defined.</div>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}
