import * as React from 'react';
import classNames from 'classnames';

import { getComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import TitleBlock from '../../blocks/TitleBlock';
import { Badge } from '../../atoms';

export default function ContactSection(props) {
    const { elementId, colors, backgroundImage, badge, title, subtitle, text, media, styles = {}, enableAnnotations } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-contact-section"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className={classNames('w-full', 'flex', 'flex-col', 'items-start', 'gap-y-8')}>
                <div className={classNames('w-full', 'max-w-sectionBody', 'text-left', 'text-light')}>
                    {badge && <Badge {...badge} {...(enableAnnotations && { 'data-sb-field-path': '.badge' })} />}
                    {title && (
                        <TitleBlock
                            {...title}
                            className={classNames({ 'mt-4': badge?.label })}
                            {...(enableAnnotations && { 'data-sb-field-path': '.title' })}
                        />
                    )}
                    {subtitle && (
                        <p className="mt-4 text-lg sm:text-xl" {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}>
                            {subtitle}
                        </p>
                    )}
                    {text && (
                        <div className="mt-6 sb-markdown sm:text-lg" {...(enableAnnotations && { 'data-sb-field-path': '.text' })}>
                            {text}
                        </div>
                    )}
                </div>

                {/* Single outline box containing the form - intentionally minimal background so it's a single border */}
                {media && (
                    <div className="w-full max-w-sectionBody">
                        <div className="w-full border border-white/6 rounded-lg p-6">
                            <ContactMedia media={media} hasAnnotations={enableAnnotations} />
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
}

function ContactMedia({ media, hasAnnotations }: { media: any; hasAnnotations: boolean }) {
    const modelName = media?.__metadata?.modelName ?? media?.type;
    if (!modelName) {
        throw new Error(`contact section media does not have the 'modelName' or 'type' property`);
    }
    const MediaComponent = getComponent(modelName);
    if (!MediaComponent) {
        throw new Error(`no component matching the contact section media model name: ${modelName}`);
    }
    return <MediaComponent {...media} {...(hasAnnotations && { 'data-sb-field-path': '.media' })} />;
}
