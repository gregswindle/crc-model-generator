

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const {expect} = chai;
const _ = require('lodash');
const CrcModel = require('../lib/crc-model');

chai.use(dirtyChai);

describe('CrcModels represent objects\' behaviors and dependencies. A CrcModel', () => {

    it('is identifiable by the object\'s name', () => {
        const crc = new CrcModel('User');
        expect(crc.name).to.exist();
        expect(crc.name).to.equal('User');
        expect(crc.responsibilities).to.be.empty();
        expect(crc.collaborators).to.be.empty();
        expect(crc.references).to.be.empty();
        expect(crc.identifier).to.be.null();
        expect(crc.declaration).to.be.null();
    });

    it('must have a name, or an error will be thrown', () => {
        const fn = () => {
            const crc = new CrcModel();
            expect(crc).not.to.be.defined();
        };
        expect(fn).to.throw(TypeError);
    });

    it('lists the object\'s responsibilities', () => {
        const verification = 'Verifies user-agent identity';
        const crc = new CrcModel('Authenticator', {responsibilities: verification});
        expect(crc.responsibilities).to.contain(verification);
    });

    it('lists other objects that it collaborates with', () => {
        const options = {
            responsibilities: ['Verifies user-agent identity'],
            collaborators   : [new CrcModel('WebForm')]
        };
        const crc = new CrcModel('Authenticator', options);
        expect(_.first(crc.collaborators)).to.have.all.keys(
            'name',
            'responsibilities',
            'collaborators',
            'references',
            'identifier',
            'declaration',
            'context',
            'superClass'
        );
    });

    it('provides an abstract syntax tree (AST) for static code analysis', () => {
        const ast = JSON.parse('{"type":"MockDeclaration","start":0,"end":14,"range":[0,14]}');
        const options = {
            responsibilities: [],
            collaborators   : [],
            references      : {
                locs: [ast]
            },
            identifier      : {},
            declaration     : {},
            superClass      : Object
        };
        const crc = new CrcModel('BloatedObject', options);
        expect(crc.identifier).to.exist();
        expect(crc.references).not.to.be.empty();

    });

    specify('CRC models should not share arrays by reference', () => {
        const crc1 = new CrcModel('crcModelOne', {
            responsibilities: [
                1,
                2,
                3
            ]
        });
        const crc2 = new CrcModel('crcModelTwo', {
            responsibilities: [
                1,
                2,
                3
            ]
        });
        expect(crc1.responsibilities.length).to.be.equal(3);
        expect(crc2.responsibilities.length).to.be.equal(3);
        expect(crc1.responsibilities).to.eql(crc2.responsibilities);
        expect(crc1.responsibilities).not.to.equal(crc2.responsibilities);
    });

    it('declares its prototype', () => {
        const crc = new CrcModel('User');
        expect(crc.superClass).to.equal(Object);
    });

});
