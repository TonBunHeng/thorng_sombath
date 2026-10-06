import React, { useEffect, useRef } from "react";
import { Crest } from "../utils/svgs";
import { Icon } from "../utils/icons";
import { toKhmerNumber } from "../data/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Finale({ wedding, t, lang, onShowToast }) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : wedding.siteUrl;
  const shareTitle = `${t.kicker} · ${wedding.couple.groom.en} & ${wedding.couple.bride.en}`;
  const finaleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const candles = document.querySelectorAll(".candle");

      gsap.set(candles, { "--lit": 0 });

      ScrollTrigger.create({
        trigger: "#finale",
        start: "top 65%",
        once: true,
        onEnter: () => {
          gsap.to(candles, {
            "--lit": 1,
            duration: 0.8,
            stagger: {
              each: 0.18,
              from: "center"
            },
            ease: "power1.out"
          });
        }
      });

      gsap.from("#finale .display", {
        scale: 0.9,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#finale",
          start: "top 55%",
          once: true
        }
      });

      gsap.from(".finale__line, .finale__actions, .finale__mono", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#finale",
          start: "top 50%",
          once: true
        }
      });
    }, finaleRef);

    return () => ctx.revert();
  }, []);

  const isMobile = typeof navigator !== "undefined" && /android|iphone|ipad/i.test(navigator.userAgent);
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const msUrl = isMobile
    ? `fb-messenger://share/?link=${encodeURIComponent(currentUrl)}`
    : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const input = document.createElement("input");
        input.value = currentUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      onShowToast(t.copied);
    } catch {
      onShowToast(t.copied);
    }
  };

  const year = new Date(wedding.date).getFullYear();

  return (
    <div ref={finaleRef}>
      <section className="chapter finale" id="finale">
        <div>
          <div className="finale__candles" id="candles" aria-hidden="true">
            <i className="candle"></i>
            <i className="candle"></i>
            <i className="candle"></i>
            <i className="candle"></i>
            <i className="candle"></i>
            <i className="candle"></i>
            <i className="candle"></i>
          </div>

          <h2 className="display foil">{t.thanks}</h2>
          <p className="finale__line">{t.thanksLine}</p>

          <div className="finale__actions">
            <a className="share share--tg btn" href={tgUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="telegram" />
              <span>
                <small>{t.shareVia} </small>Telegram
              </span>
            </a>
            <a className="share share--ms btn" href={msUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="messenger" />
              <span>
                <small>{t.shareVia} </small>Messenger
              </span>
            </a>
            <a className="share share--fb btn" href={fbUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="facebook" />
              <span>
                <small>{t.shareVia} </small>Facebook
              </span>
            </a>
            <button className="share share--copy btn" type="button" onClick={handleCopy}>
              <Icon name="link" />
              <span>
                <small>{t.copyLinkSmall} </small>
                <b>{t.copyLink}</b>
              </span>
            </button>
          </div>

          <div className="finale__mono" id="finale-mono" style={{ width: 80, margin: "3rem auto 0" }}>
            <Crest />
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>{wedding.couple.groom[lang]}</span> &amp; <span>{wedding.couple.bride[lang]}</span> ·{" "}
        <span>{lang === "km" ? toKhmerNumber(year) : year}</span>
      </footer>
    </div>
  );
}
