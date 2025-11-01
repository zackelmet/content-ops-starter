import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import TitleBlock from '../../blocks/TitleBlock';
import ImageBlock from '../../blocks/ImageBlock';
import { Action, Badge } from '../../atoms';

export default function PricingSection(props) {
    const { elementId, colors, backgroundImage, badge, title, subtitle, plans = [], styles = {}, enableAnnotations } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-pricing-section"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className={classNames('w-full', 'flex', 'flex-col', mapStyles({ alignItems: styles?.self?.justifyContent ?? 'flex-start' }))}>
                {badge && <Badge {...badge} className="w-full max-w-sectionBody" {...(enableAnnotations && { 'data-sb-field-path': '.badge' })} />}
                {title && (
                    <TitleBlock
                        {...title}
                        className={classNames('w-full', 'max-w-6xl', 'mx-auto', { 'mt-4': badge?.label })}
                        {...(enableAnnotations && { 'data-sb-field-path': '.title' })}
                    />
                )}
                {subtitle && (
                    <p
                        className={classNames(
                            'w-full',
                            'max-w-6xl',
                            'mx-auto',
                            'text-lg',
                            'sm:text-2xl',
                            styles?.subtitle ? mapStyles(styles?.subtitle) : undefined,
                            {
                                'mt-4': badge?.label || title?.text
                            }
                        )}
                        {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}
                    >
                        {subtitle}
                    </p>
                )}
                {plans.length > 0 && (
                    <div className={classNames('w-full', 'overflow-x-hidden', { 'mt-12': !!(badge?.label || title?.text || subtitle) })}>
                        <div className="w-full max-w-6xl mx-auto">
                            <div
                                className={classNames('flex', 'flex-wrap', 'items-stretch', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }), 'gap-y-10', '-mx-5')}
                                {...(enableAnnotations && { 'data-sb-field-path': '.plans' })}
                            >
                                {plans.map((plan, index) => (
                                    <div key={index} className="px-5 basis-full max-w-full sm:basis-5/6 sm:max-w-[83.33333%] md:basis-2/3 md:max-w-[66.66667%] lg:basis-1/4 lg:max-w-[25%]">
                                        <PricingPlan
                                            {...plan}
                                            stepIndex={index + 1}
                                            hasSectionTitle={!!title?.text}
                                            {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
}

function PricingPlan(props) {
    const {
        elementId,
        title,
        price,
        details,
        description,
        features = [],
        image,
        actions = [],
        colors = 'bg-light-fg-dark',
        styles = {},
        hasSectionTitle
    } = props;
    const fieldPath = props['data-sb-field-path'];
    const TitleTag = hasSectionTitle ? 'h3' : 'h2';

    const isDarkBg = String(colors || '').includes('dark');

    return (
        <div
            id={elementId}
            className={classNames(
                'sb-card',
                'card-hover',
                'fade-in',
                'h-full',
                colors,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
                styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
                    ? mapStyles({
                        borderWidth: styles?.self?.borderWidth,
                        borderStyle: styles?.self?.borderStyle,
                        borderColor: styles?.self?.borderColor ?? 'border-primary'
                    })
                    : undefined,
                styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined,
                styles?.self?.textAlign ? mapStyles({ textAlign: styles?.self?.textAlign }) : undefined,
                'overflow-hidden',
                'relative',
                'flex',
                'flex-col'
            )}
            data-sb-field-path={fieldPath}
        >
            {/* Step badge for process visualization */}
            {typeof props.stepIndex === 'number' && (
                <div className="absolute -mt-3 ml-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-light font-bold">{props.stepIndex}</div>
                </div>
            )}
            {/* Decorative step header (replaces legacy image slot) */}
            <div className={classNames('w-full flex items-center justify-center p-6 bg-[#071128]')}>
                <div className="text-center">
                    <div className="text-sm text-primary uppercase tracking-wide mb-1">Step {props.stepIndex}</div>
                    <div className={classNames('text-2xl font-semibold tracking-wide text-[#00fed9]')}>{title}</div>
                </div>
            </div>
            {(title || price || details || description || features.length > 0 || actions.length > 0) && (
                <div
                    id={elementId}
                    className={classNames('grow', 'flex', 'flex-col')}
                >
                    {/* Wrap step content in a muted grey panel so text is readable */}
                    <div className={classNames('p-8', 'rounded-b-md', 'bg-[#071128]', 'text-[#00fed9]', styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined)}>
                        {/* Title is rendered in the decorative header above; omit duplicate title here. */}
                        {(price || details) && (
                            <div className={classNames({ 'mt-6': title })}>
                                {price && (
                                    <div className="text-4xl sm:text-6xl font-medium" {...(fieldPath && { 'data-sb-field-path': '.price' })}>
                                        {price}
                                    </div>
                                )}
                                {details && (
                                    <div
                                        className={classNames('text-sm', 'font-medium', { 'mt-2': title })}
                                        {...(fieldPath && { 'data-sb-field-path': '.details' })}
                                    >
                                        {details}
                                    </div>
                                )}
                            </div>
                        )}
                        {description && (
                            <Markdown
                                options={{ forceBlock: true, forceWrapper: true }}
                                className={classNames('sb-markdown', { 'mt-10': title || price || details, 'text-[#00fed9]': true })}
                                {...(fieldPath && { 'data-sb-field-path': '.description' })}
                            >
                                {description}
                            </Markdown>
                        )}
                        {features.length > 0 && (
                            <ul
                                className={classNames('list-disc', 'list-inside', 'text-sm', 'space-y-2', {
                                    'mt-4': description,
                                    'mt-10': !description && (title || price || details)
                                })}
                                {...(fieldPath && { 'data-sb-field-path': '.features' })}
                            >
                                {features.map((bullet, index) => (
                                    <li key={index} {...(fieldPath && { 'data-sb-field-path': `.${index}` })}>
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {actions.length > 0 && (
                            <div
                                className={classNames(
                                    'flex',
                                    'flex-wrap',
                                    mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }),
                                    'items-center',
                                    'gap-4',
                                    {
                                        'mt-auto pt-12': title || price || details || description || features.length > 0
                                    }
                                )}
                                {...(fieldPath && { 'data-sb-field-path': '.actions' })}
                            >
                                {actions.map((action, index) => (
                                    <Action key={index} {...action} className="lg:whitespace-nowrap" {...(fieldPath && { 'data-sb-field-path': `.${index}` })} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
