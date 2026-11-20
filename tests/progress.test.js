import test from 'node:test';
import assert from 'node:assert/strict';
import {dayNumber} from '../src/content.js';
test('Liberação à meia-noite de São Paulo',()=>{
 for(const [instant,day] of [['2026-11-20T02:59:59Z',-1],['2026-11-20T03:00:00Z',0],['2026-11-23T03:00:00Z',3],['2026-11-26T03:00:00Z',6],['2026-12-01T03:00:00Z',11]])
   assert.equal(dayNumber(new Date(instant)),day);
});
