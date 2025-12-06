import styles from './FooterCTA.module.css';

export default function CTASection() {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaContainer}>
                <h2 className={styles.ctaTitle}>Ready to 10x Your LinkedIn Engagement?</h2>
                <form className={styles.ctaForm} action="/sign-up">
                    <input type="email" placeholder="Enter your email address" className={styles.ctaInput} required />
                    <button type="submit" className={styles.ctaButton}>Get Started Free</button>
                </form>
                <p className={styles.ctaSub}>No credit card required. 14-day free trial on Pro plans.</p>
            </div>
        </section>
    );
}
