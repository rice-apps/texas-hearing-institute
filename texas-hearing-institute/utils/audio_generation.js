var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Segment = /** @class */ (function () {
    function Segment(name, ipa) {
        this.name = '';
        this.ipa = '';
        this.name = name;
        this.ipa = ipa;
    }
    return Segment;
}());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var ConsonantSegment = /** @class */ (function (_super) {
    __extends(ConsonantSegment, _super);
    function ConsonantSegment(name, ipa, categories, petalIds) {
        if (petalIds === void 0) { petalIds = {}; }
        var _a, _b, _c, _d;
        var _this = _super.call(this, name, ipa) || this;
        // Categories can contain either ConsonantCategories.initial, .final, or both
        _this.categories = [];
        // Maps "ConsonantFlower.XXX" to the petal IDs that this consonant belongs to in that flower
        _this.flowerToPetalIds = new Map([
            [ConsonantFlower.Manner, []],
            [ConsonantFlower.Voice, []],
            [ConsonantFlower.Place, []],
            [ConsonantFlower.All, []],
        ]);
        _this.categories = categories;
        _this.flowerToPetalIds = new Map([
            [ConsonantFlower.Manner, (_a = petalIds.manner) !== null && _a !== void 0 ? _a : []],
            [ConsonantFlower.Voice, (_b = petalIds.voice) !== null && _b !== void 0 ? _b : []],
            [ConsonantFlower.Place, (_c = petalIds.place) !== null && _c !== void 0 ? _c : []],
            [ConsonantFlower.All, (_d = petalIds.all) !== null && _d !== void 0 ? _d : []],
        ]);
        return _this;
    }
    ConsonantSegment.prototype.getPetalIds = function (consonantFlower) {
        var _a;
        // Return the corresponding petal IDs (or, for null safety, an empty array if the value doesn't exist)
        return (_a = this.flowerToPetalIds.get(consonantFlower)) !== null && _a !== void 0 ? _a : [];
    };
    // Fetch other ConsonantSegments from canSayInventory that share any of the petalIds in this.getPetalIds
    ConsonantSegment.prototype.fetchConsonantSiblings = function (flower, canSayInventory) {
        var _this = this;
        var petalIds = this.getPetalIds(flower);
        // Use filter to ensure x is of type ConsonantSegment
        var consonantSegments = canSayInventory.filter(function (x) { return x instanceof ConsonantSegment; });
        // Use filter and intersection logic to check if there are common petalIds
        var consonantSiblings = consonantSegments.filter(function (x) {
            return x.name != _this.name && // Don't include our own ConsonantSegment as a sibling
                x
                    .getPetalIds(flower)
                    .some(function (petalId) { return petalIds.includes(petalId); });
        });
        return consonantSiblings;
    };
    return ConsonantSegment;
}(Segment));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var VowelSegment = /** @class */ (function (_super) {
    __extends(VowelSegment, _super);
    function VowelSegment(name, ipa) {
        return _super.call(this, name, ipa) || this;
    }
    return VowelSegment;
}(Segment));
var ConsonantCategories;
(function (ConsonantCategories) {
    ConsonantCategories[ConsonantCategories["Initial"] = 0] = "Initial";
    ConsonantCategories[ConsonantCategories["Final"] = 1] = "Final";
})(ConsonantCategories || (ConsonantCategories = {}));
var ConsonantFlower;
(function (ConsonantFlower) {
    ConsonantFlower[ConsonantFlower["Manner"] = 0] = "Manner";
    ConsonantFlower[ConsonantFlower["Voice"] = 1] = "Voice";
    ConsonantFlower[ConsonantFlower["Place"] = 2] = "Place";
    ConsonantFlower[ConsonantFlower["All"] = 3] = "All";
})(ConsonantFlower || (ConsonantFlower = {}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var AllSegments = /** @class */ (function () {
    function AllSegments() {
    }
    AllSegments.getAllSegmentsHardcoded = function () {
        return [
            // Vowels
            new VowelSegment('oo', 'u'),
            new VowelSegment('ee', 'i'),
            new VowelSegment('uh', 'ʌ'),
            new VowelSegment('ow', 'əʊ'),
            new VowelSegment('eye', 'aɪ'),
            new VowelSegment('oh', 'o'),
            new VowelSegment('oy', 'ɔɪ'),
            new VowelSegment('ih', 'ɪ'),
            new VowelSegment('ah', 'ɑ'),
            new VowelSegment('ay', 'ɛ'),
            // Consonants
            new ConsonantSegment('t', 't', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [0],
                voice: [3],
                place: [3],
                all: [0],
            }),
            new ConsonantSegment('s', 's', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [0],
                voice: [0],
                place: [1],
                all: [0],
            }),
            new ConsonantSegment('sh', 'ʃ', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [0],
                place: [1],
                all: [0],
            }),
            new ConsonantSegment('y', 'j', [ConsonantCategories.Initial], {
                manner: [0, 1],
                all: [0],
            }),
            new ConsonantSegment('n', 'n', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [0, 1],
                place: [0],
                all: [0],
            }),
            new ConsonantSegment('l', 'l', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [0, 1],
                all: [0],
            }),
            new ConsonantSegment('z', 'z', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [1],
                voice: [0],
                place: [2],
                all: [0],
            }),
            new ConsonantSegment('d', 'd', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [1],
                voice: [3],
                place: [4],
                all: [0],
            }),
            new ConsonantSegment('zh', 'ʒ', [ConsonantCategories.Final], {
                manner: [1],
                place: [2],
                all: [0],
            }),
            new ConsonantSegment('g', 'ɡ', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [2, 3],
                voice: [1],
                place: [4],
                all: [0],
            }),
            new ConsonantSegment('r', 'ɾ', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [2, 3, 4, 5],
                all: [0],
            }),
            new ConsonantSegment('j', 'dʒ', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [2, 4],
                all: [0],
            }),
            new ConsonantSegment('ng', 'ŋ', [ConsonantCategories.Final], {
                manner: [2, 3, 4, 5],
                place: [0],
                all: [0],
            }),
            new ConsonantSegment('ch', 'tʃ⁠', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [3, 5],
                all: [0],
            }),
            new ConsonantSegment('k', 'k', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [4, 5],
                voice: [1],
                place: [3],
                all: [0],
            }),
            new ConsonantSegment('p', 'p', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [6],
                voice: [4],
                place: [3],
                all: [0],
            }),
            new ConsonantSegment('h', 'h', [ConsonantCategories.Initial], {
                manner: [6, 7],
                place: [1],
                all: [0],
            }),
            new ConsonantSegment('w', 'w', [ConsonantCategories.Initial], {
                manner: [6, 7],
                all: [0],
            }),
            new ConsonantSegment('m', 'm', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [6, 7],
                place: [0],
                all: [0],
            }),
            new ConsonantSegment('b', 'b', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                manner: [7],
                voice: [4],
                place: [4],
                all: [0],
            }),
            new ConsonantSegment('f', 'f', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                voice: [2],
                place: [1],
                all: [0],
            }),
            new ConsonantSegment('v', 'v', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                voice: [2],
                place: [2],
                all: [0],
            }),
            new ConsonantSegment('th', 'θ', [ConsonantCategories.Initial, ConsonantCategories.Final], {
                place: [2],
                all: [0],
            }),
        ];
    };
    return AllSegments;
}());
// ---- NEW ----
// Imports the Google Cloud client library
var textToSpeech = require('@google-cloud/text-to-speech');
// Import other required libraries
var fs = require('fs');
var util = require('util');
// Creates a client
var client = new textToSpeech.TextToSpeechClient();
function generateAudio() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, vowel, _b, _c, consonant, text, ipa, request, response, writeFile, fileName;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _i = 0, _a = AllSegments.getAllSegmentsHardcoded().filter(function (value) {
                        return value instanceof VowelSegment;
                    });
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    vowel = _a[_i];
                    _b = 0, _c = AllSegments.getAllSegmentsHardcoded().filter(function (value) {
                        return value instanceof ConsonantSegment;
                    });
                    _d.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 6];
                    consonant = _c[_b];
                    text = consonant.name + vowel.name;
                    ipa = consonant.ipa + vowel.ipa;
                    request = {
                        input: {
                            'ssml': '<phoneme alphabet=ipa ph="a">a</phoneme>'
                        },
                        // Select the language and SSML voice gender (optional)
                        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
                        // select the type of audio encoding
                        audioConfig: { audioEncoding: 'MP3' },
                    };
                    return [4 /*yield*/, client.synthesizeSpeech(request)];
                case 3:
                    response = (_d.sent())[0];
                    writeFile = util.promisify(fs.writeFile);
                    fileName = text + '.mp3';
                    return [4 /*yield*/, writeFile(fileName, response.audioContent, 'binary')];
                case 4:
                    _d.sent();
                    console.log('Audio content written to file: output.mp3');
                    _d.label = 5;
                case 5:
                    _b++;
                    return [3 /*break*/, 2];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
generateAudio();
