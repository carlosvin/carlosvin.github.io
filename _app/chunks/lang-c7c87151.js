const t=new class{constructor(){this._translations=new Map}get(t){const s=this._translations.get(this._lang);if(!s)throw new Error(`there are no translations for ${this._lang}`);return s[t]||t}setLang(t,s){return this._lang!==t&&(this._lang=t,this._translations.set(this._lang,s)),this}get lang(){return this._lang}get siteName(){return this.get("siteName")}get siteDescription(){return this.get("siteDescription")}};export{t as i};
