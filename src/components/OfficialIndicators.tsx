import React, { useState, useRef, useEffect } from "react";
import { HeartPulse, Clock, ShieldCheck } from "lucide-react";

export const OfficialIndicators: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="indicadores-oficiais" ref={sectionRef} className="py-12 bg-[#FAF7F2] border-b border-[#E4DDCF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A31E22] block mb-1">
            DADOS OFICIAIS AUDITADOS
          </span>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#13213F]">
            A diferença real entre viver em alerta e viver em paz
          </h2>
          <p className="text-xs sm:text-sm text-[#5A554E] mt-1.5 leading-relaxed">
            Dados auditados pelos órgãos governamentais de estatística da Espanha (INE, Eurostat) e do Brasil (IBGE, IPEA).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Expectativa de Vida */}
          <div className="bg-white border border-[#E4DDCF] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#A31E22]/10 flex items-center justify-center text-[#A31E22] shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-brand text-base font-bold text-[#13213F]">
                    Esperança de Vida
                  </h3>
                  <span className="text-[10px] font-mono text-[#6B655D] uppercase">
                    INE Espanha vs IBGE Brasil
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif-brand text-3xl font-black text-[#A31E22]">
                    +8,0 anos
                  </span>
                  <span className="text-xs font-bold text-[#13213F]">de vida a mais</span>
                </div>
                <p className="text-xs text-[#5A554E] mt-1">
                  Espanha tem a maior expectativa de vida da União Europeia e a 5ª do mundo.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#F8F5EF] p-3 rounded-xl border border-[#EAE3D6] my-3 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <span>🇧🇷</span> Brasil
                    </span>
                    <span className="font-mono font-bold text-slate-700">76,0 anos</span>
                  </div>
                  <div className="h-2 bg-[#E2DACB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: hasAnimated ? "76%" : "0%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-1.5 font-bold text-[#A31E22]">
                      <span>🇪🇸</span> Espanha
                    </span>
                    <span className="font-mono font-bold text-[#A31E22]">84,0 anos</span>
                  </div>
                  <div className="h-2 bg-[#E2DACB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#A31E22] rounded-full transition-all duration-1000 ease-out delay-150"
                      style={{ width: hasAnimated ? "84%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EFE9DF] pt-2 flex items-center justify-between text-[11px] text-[#8C8479]">
              <span>Fonte: INE (2024) / IBGE</span>
              <span className="font-semibold text-emerald-700">+9,5% mais tempo em família</span>
            </div>
          </div>

          {/* Card 2: 2 Anos de Cidadania */}
          <div className="bg-white border-2 border-[#A31E22] rounded-2xl p-5 shadow-sm flex flex-col justify-between relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#A31E22] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              Privilégio Histórico
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#A31E22]/10 flex items-center justify-center text-[#A31E22] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-brand text-base font-bold text-[#13213F]">
                    Cidadania Europeia
                  </h3>
                  <span className="text-[10px] font-mono text-[#A31E22] font-bold uppercase">
                    Código Civil Espanhol (Art. 22)
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif-brand text-3xl font-black text-[#13213F]">
                    2 Anos
                  </span>
                  <span className="text-xs font-extrabold text-[#A31E22]">vs 10 anos do mundo</span>
                </div>
                <p className="text-xs text-[#5A554E] mt-1">
                  Brasileiros têm o direito de pedir nacionalidade com apenas 24 meses de residência legal.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#FDF2F2] p-3 rounded-xl border border-[#FCA5A5]/40 my-3 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span>🌍</span> Outros Países
                    </span>
                    <span className="font-mono font-bold text-slate-700">10 anos</span>
                  </div>
                  <div className="h-2 bg-[#E2DACB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: hasAnimated ? "100%" : "0%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-1.5 font-bold text-[#A31E22]">
                      <span>🇧🇷 ➔ 🇪🇸</span> Brasileiros
                    </span>
                    <span className="font-mono font-bold text-[#A31E22]">2 anos</span>
                  </div>
                  <div className="h-2 bg-[#E2DACB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-out delay-150"
                      style={{ width: hasAnimated ? "20%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EFE9DF] pt-2 flex items-center justify-between text-[11px] text-[#8C8479]">
              <span>Base: Art. 22.1 Código Civil</span>
              <span className="font-bold text-[#A31E22]">80% menos tempo de espera</span>
            </div>
          </div>

          {/* Card 3: Segurança Pública */}
          <div className="bg-white border border-[#E4DDCF] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-brand text-base font-bold text-[#13213F]">
                    Segurança Pública
                  </h3>
                  <span className="text-[10px] font-mono text-[#6B655D] uppercase">
                    Homicídios por 100k hab.
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif-brand text-3xl font-black text-emerald-700">
                    34x Mais
                  </span>
                  <span className="text-xs font-bold text-[#13213F]">seguro que o Brasil</span>
                </div>
                <p className="text-xs text-[#5A554E] mt-1">
                  Andar com o celular na mão à noite sem medo. Seus filhos no parque com liberdade total.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#F8F5EF] p-3 rounded-xl border border-[#EAE3D6] my-3 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <span>🇧🇷</span> Brasil
                    </span>
                    <span className="font-mono font-bold text-rose-700">20,4 / 100k</span>
                  </div>
                  <div className="h-2 bg-[#E2DACB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: hasAnimated ? "95%" : "0%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <span>🇪🇸</span> Espanha
                    </span>
                    <span className="font-mono font-bold text-emerald-700">0,6 / 100k</span>
                  </div>
                  <div className="h-2 bg-[#E2DACB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-out delay-150"
                      style={{ width: hasAnimated ? "5%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EFE9DF] pt-2 flex items-center justify-between text-[11px] text-[#8C8479]">
              <span>Fonte: Eurostat & IPEA</span>
              <span className="font-bold text-emerald-700">3º país mais seguro da UE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
