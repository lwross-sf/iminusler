(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[78],{f0Jk:function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var i=n("hhPA"),r=n.n(i),c=n("dUu8"),o=n("NZ0w"),s=n("cdKJ"),h=n("tDFQ"),d=n("Wdql"),u=n("2oex");const a={name:"CheckpointStore",init(){this.listenToMany(c.a),this.listenTo(o.a.restore.completed,this.onReset)},checkpointsRunning(){return Object(d.h)(this.redux.getState())},currentCheckpointIndex(){return Object(d.j)(this.redux.getState())},checkpointCount(){return Object(u.o)(this.redux.getState()).checkpoints.length},onReset(){this.redux.dispatch(Object(s.c)()),this.redux.dispatch(Object(h.f)())},onRun(){this.redux?this.redux.dispatch(Object(h.i)()):c.a.run.completed()},onSaveReduxReference({dispatch:t,getState:e}){this.redux={},this.redux.dispatch=t,this.redux.getState=e},onSaveTerminalReference(t){this.terminalComponent=t},getActiveTerminal(){const t=this.terminalComponent&&this.terminalComponent.getActiveTerminal();if(t)return t;const testerNoop=function(){return!1};return{ranOneOfWithExitCode:testerNoop,didRunCommand:testerNoop,didRunOneOf:testerNoop}}},p=r.a.createStore(a)}}]);
//# sourceMappingURL=78.dccd662646d4c3b7091b.chunk.js.map