import styles from './SocialProof.module.css';

export default function SocialProof() {
    return (
        <section className={styles.section} id="testimonials">
            <div className={styles.container}>
                <div className={styles.rating}>
                    <div className={styles.stars}>★★★★★</div>
                    <span>4.9/5 Average Rating</span>
                </div>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <p className={styles.quote}>"I used to spend 2 hours writing a single LinkedIn post. With Resonate, I generate a week's worth of content in 15 minutes. It's a game changer."</p>
                        <div className={styles.author}>
                            <div className={styles.avatar} style={{ background: '#ccc' }}></div>
                            <div className={styles.meta}>
                                <span className={styles.name}>Sarah Jenkins</span>
                                <span className={styles.title}>Marketing Director</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <p className={styles.quote}>"The hook scoring feature is incredible. My engagement has increased by 300% since I started using Resonate to optimize my opening lines."</p>
                        <div className={styles.author}>
                            <div className={styles.avatar} style={{ background: '#bbb' }}></div>
                            <div className={styles.meta}>
                                <span className={styles.name}>David Chen</span>
                                <span className={styles.title}>Startup Founder</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <p className={styles.quote}>"Finally, an AI tool that doesn't sound like a robot. The 'Personal DNA' feature nails my tone of voice perfectly every time."</p>
                        <div className={styles.author}>
                            <div className={styles.avatar} style={{ background: '#aaa' }}></div>
                            <div className={styles.meta}>
                                <span className={styles.name}>Emily Rossi</span>
                                <span className={styles.title}>Growth Consultant</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.featuredLogos}>
                    {/* Using text placeholders for logos as per standard practice when real assets aren't provided */}
                    <span className={styles.logoPlaceholder}>TechCrunch</span>
                    <span className={styles.logoPlaceholder}>Forbes</span>
                    <span className={styles.logoPlaceholder}>IndieHackers</span>
                    <span className={styles.logoPlaceholder}>ProductHunt</span>
                </div>
            </div>
        </section>
    );
}
