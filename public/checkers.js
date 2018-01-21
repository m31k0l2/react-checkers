if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'checkers'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'checkers'.");
}
var checkers = function (_, Kotlin) {
  'use strict';
  var Regex = Kotlin.kotlin.text.Regex_61zpoe$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var Unit = Kotlin.kotlin.Unit;
  var toList = Kotlin.kotlin.collections.toList_us0mfu$;
  var toSet = Kotlin.kotlin.collections.toSet_7wnvza$;
  var equals = Kotlin.equals;
  var contains = Kotlin.kotlin.text.contains_li3zpu$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var filterNotNull = Kotlin.kotlin.collections.filterNotNull_m3lr2h$;
  var throwUPAE = Kotlin.throwUPAE;
  var reverse = Kotlin.kotlin.collections.reverse_vvxzk3$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var any = Kotlin.kotlin.collections.any_7wnvza$;
  var listOf_0 = Kotlin.kotlin.collections.listOf_mh5how$;
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var abs = Kotlin.kotlin.math.abs_za3lpa$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var toList_0 = Kotlin.kotlin.collections.toList_7wnvza$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var toChar = Kotlin.toChar;
  var throwCCE = Kotlin.throwCCE;
  var CharRange = Kotlin.kotlin.ranges.CharRange;
  var unboxChar = Kotlin.unboxChar;
  var toMap = Kotlin.kotlin.collections.toMap_6hr0sd$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var downTo = Kotlin.kotlin.ranges.downTo_dqglrj$;
  var print = Kotlin.kotlin.io.print_s8jyv4$;
  var println_0 = Kotlin.kotlin.io.println;
  var sum = Kotlin.kotlin.collections.sum_l63kqw$;
  function GameController(initboard) {
    if (initboard === void 0)
      initboard = null;
    this.board_0 = null;
    this.currentColor = 0;
    this.bot_0 = new Player((new NetworkIO()).load(), 2);
    this.botColor = 1;
    var tmp$;
    if (initboard != null)
      tmp$ = initboard;
    else {
      var $receiver = new Checkerboard();
      var whiteCheckers = listOf(['a1', 'c1', 'e1', 'g1', 'b2', 'd2', 'f2', 'h2', 'a3', 'c3', 'e3', 'g3']);
      var blackCheckers = listOf(['b8', 'd8', 'f8', 'h8', 'a7', 'c7', 'e7', 'g7', 'b6', 'd6', 'f6', 'h6']);
      $receiver.init_2mkhiy$(whiteCheckers, blackCheckers);
      tmp$ = $receiver;
    }
    this.board_0 = tmp$;
  }
  Object.defineProperty(GameController.prototype, 'checkerboard', {
    get: function () {
      return this.board_0.clone();
    }
  });
  GameController.prototype.print = function () {
    this.board_0.print();
  };
  GameController.prototype.move_0 = function (from, to) {
    this.board_0.move_puj7f4$(from, to);
  };
  GameController.prototype.kill_0 = function (from, to) {
    var tmp$;
    var checker = (tmp$ = this.board_0.get_61zpoe$(from)) != null ? tmp$.checker : null;
    this.board_0.remove_puj7f4$(from, to);
    this.board_0.place_dyx5dk$(to, checker);
  };
  GameController.prototype.go = function (command) {
    var tmp$, tmp$_0;
    var moveTemplate = Regex('([a-z]\\d)-([a-z]\\d)');
    var killTemplate = Regex('([a-z]\\d):([a-z]\\d).*');
    if ((tmp$ = moveTemplate.matchEntire_6bul2c$(command)) != null) {
      var from = ensureNotNull(tmp$.groups.get_za3lpa$(1)).value;
      var to = ensureNotNull(tmp$.groups.get_za3lpa$(2)).value;
      this.move_0(from, to);
      return;
    }
    if ((tmp$_0 = killTemplate.matchEntire_6bul2c$(command)) != null) {
      var tmp$_1;
      var positions = split(tmp$_0.value, [':']);
      tmp$_1 = positions.size;
      for (var i = 1; i < tmp$_1; i++) {
        var from_0 = positions.get_za3lpa$(i - 1 | 0);
        var to_0 = positions.get_za3lpa$(i);
        this.kill_0(from_0, to_0);
      }
    }
  };
  GameController.prototype.queen_61zpoe$ = function (pos) {
    var tmp$, tmp$_0;
    (tmp$_0 = (tmp$ = this.board_0.get_61zpoe$(pos)) != null ? tmp$.checker : null) != null ? (tmp$_0.type = 1) : null;
  };
  GameController.prototype.nextMoves = function () {
    return (new MoveSearcher(this.currentColor, this.board_0)).nextMoves();
  };
  GameController.prototype.init = function (whiteCheckers, blackCheckers, queens) {
    this.board_0.init_2mkhiy$(toList(whiteCheckers), toList(blackCheckers));
    var tmp$;
    for (tmp$ = 0; tmp$ !== queens.length; ++tmp$) {
      var element = queens[tmp$];
      this.queen_61zpoe$(element);
    }
  };
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  GameController.prototype.extractActiveFields = function (moves) {
    var destination = ArrayList_init(collectionSizeOrDefault(moves, 10));
    var tmp$;
    tmp$ = moves.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.substring(0, 2));
    }
    return copyToArray(toSet(destination));
  };
  GameController.prototype.getCheckerMoveFields = function (moves, position) {
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = moves.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (equals(element.substring(0, 2), position))
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      var tmp$_1 = destination_0.add_11rb$;
      var startIndex = item.length - 2 | 0;
      var endIndex = item.length;
      tmp$_1.call(destination_0, item.substring(startIndex, endIndex));
    }
    return copyToArray(toSet(destination_0));
  };
  var NoSuchElementException_init = Kotlin.kotlin.NoSuchElementException;
  GameController.prototype.getCommand = function (moves, from, to) {
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = moves.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (equals(element.substring(0, 2), from))
        destination.add_11rb$(element);
    }
    var tmp$result;
    tmp$break: do {
      var tmp$_0;
      tmp$_0 = destination.iterator();
      while (tmp$_0.hasNext()) {
        var element_0 = tmp$_0.next();
        var startIndex = element_0.length - 2 | 0;
        var endIndex = element_0.length;
        if (equals(element_0.substring(startIndex, endIndex), to)) {
          tmp$result = element_0;
          break tmp$break;
        }
      }
      throw new NoSuchElementException_init('Collection contains no element matching the predicate.');
    }
     while (false);
    return tmp$result;
  };
  GameController.prototype.getWhiteCheckers = function () {
    var $receiver = this.checkerboard.getCheckers_za3lpa$(0);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.toString());
    }
    return copyToArray(destination);
  };
  GameController.prototype.getBlackCheckers = function () {
    var $receiver = this.checkerboard.getCheckers_za3lpa$(1);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.toString());
    }
    return copyToArray(destination);
  };
  GameController.prototype.getQueens = function () {
    var $receiver = this.checkerboard.board;
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.checker != null && ensureNotNull(element.checker).type === 1)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination_0.add_11rb$(new Position(item.x, item.y));
    }
    var destination_1 = ArrayList_init(collectionSizeOrDefault(destination_0, 10));
    var tmp$_1;
    tmp$_1 = destination_0.iterator();
    while (tmp$_1.hasNext()) {
      var item_0 = tmp$_1.next();
      destination_1.add_11rb$(item_0.toString());
    }
    return copyToArray(destination_1);
  };
  GameController.prototype.getBotStep = function () {
    var moves = this.nextMoves();
    if (moves.isEmpty())
      return 'lose';
    return this.bot_0.selectMove_ydazgc$(this.checkerboard, this.botColor, moves);
  };
  GameController.prototype.getStepPoints = function (command) {
    var positions = contains(command, '-') ? split(command, ['-']) : split(command, [':']);
    return copyToArray(positions);
  };
  GameController.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameController',
    interfaces: []
  };
  function InputEncoder() {
  }
  var addAll = Kotlin.kotlin.collections.addAll_ipc267$;
  InputEncoder.prototype.conv_0 = function (input, x0, size) {
    var list = ArrayList_init(size);
    var tmp$;
    tmp$ = size - 1 | 0;
    for (var index = 0; index <= tmp$; index++) {
      var tmp$_0 = list.add_11rb$;
      var list_0 = ArrayList_init(size);
      var tmp$_1;
      tmp$_1 = size - 1 | 0;
      for (var index_0 = 0; index_0 <= tmp$_1; index_0++) {
        list_0.add_11rb$(input.get_za3lpa$(x0 + index_0 + (8 * index | 0) | 0));
      }
      tmp$_0.call(list, list_0);
    }
    var destination = ArrayList_init();
    var tmp$_2;
    tmp$_2 = list.iterator();
    while (tmp$_2.hasNext()) {
      var element = tmp$_2.next();
      var list_1 = element;
      addAll(destination, list_1);
    }
    return destination;
  };
  InputEncoder.prototype.convMatrix_0 = function (input, size) {
    var $receiver = new IntRange(0, 8 - size | 0);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      var tmp$_0 = destination.add_11rb$;
      var $receiver_0 = new IntRange(0, 8 - size | 0);
      var destination_0 = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
      var tmp$_1;
      tmp$_1 = $receiver_0.iterator();
      while (tmp$_1.hasNext()) {
        var item_0 = tmp$_1.next();
        destination_0.add_11rb$(this.conv_0(input, item_0 + (item * 8 | 0) | 0, size));
      }
      tmp$_0.call(destination, destination_0);
    }
    var destination_1 = ArrayList_init();
    var tmp$_2;
    tmp$_2 = destination.iterator();
    while (tmp$_2.hasNext()) {
      var element = tmp$_2.next();
      var list = element;
      addAll(destination_1, list);
    }
    return destination_1;
  };
  InputEncoder.prototype.convInput_0 = function (vector, size) {
    var $receiver = new IntRange(0, 7);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(vector.subList_vux9f0$(item * 4 | 0, (item + 1 | 0) * 4 | 0));
    }
    var matrix = destination;
    var destination_0 = ArrayList_init(collectionSizeOrDefault(matrix, 10));
    var tmp$_0, tmp$_0_0;
    var index = 0;
    tmp$_0 = matrix.iterator();
    while (tmp$_0.hasNext()) {
      var item_0 = tmp$_0.next();
      var tmp$_1 = destination_0.add_11rb$;
      var i = (tmp$_0_0 = index, index = tmp$_0_0 + 1 | 0, tmp$_0_0);
      var destination_1 = ArrayList_init(collectionSizeOrDefault(item_0, 10));
      var tmp$_2;
      tmp$_2 = item_0.iterator();
      while (tmp$_2.hasNext()) {
        var item_1 = tmp$_2.next();
        var tmp$_3 = destination_1.add_11rb$;
        var transform$result;
        if (i % 2 === 0) {
          transform$result = listOf([null, item_1]);
        }
         else {
          transform$result = listOf([item_1, null]);
        }
        tmp$_3.call(destination_1, transform$result);
      }
      var destination_2 = ArrayList_init();
      var tmp$_4;
      tmp$_4 = destination_1.iterator();
      while (tmp$_4.hasNext()) {
        var element = tmp$_4.next();
        var list = element;
        addAll(destination_2, list);
      }
      tmp$_1.call(destination_0, destination_2);
    }
    var destination_3 = ArrayList_init();
    var tmp$_5;
    tmp$_5 = destination_0.iterator();
    while (tmp$_5.hasNext()) {
      var element_0 = tmp$_5.next();
      var list_0 = element_0;
      addAll(destination_3, list_0);
    }
    var board = destination_3;
    var $receiver_0 = this.convMatrix_0(board, size);
    var destination_4 = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
    var tmp$_6;
    tmp$_6 = $receiver_0.iterator();
    while (tmp$_6.hasNext()) {
      var item_2 = tmp$_6.next();
      destination_4.add_11rb$(filterNotNull(item_2));
    }
    var destination_5 = ArrayList_init();
    var tmp$_7;
    tmp$_7 = destination_4.iterator();
    while (tmp$_7.hasNext()) {
      var element_1 = tmp$_7.next();
      if (!element_1.isEmpty())
        destination_5.add_11rb$(element_1);
    }
    return destination_5;
  };
  InputEncoder.prototype.encode_d3e2cz$ = function (vector) {
    var $receiver = new IntRange(3, 8);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var list = this.convInput_0(vector, element);
      addAll(destination, list);
    }
    return destination;
  };
  InputEncoder.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'InputEncoder',
    interfaces: []
  };
  function MoveSearcher(currentColor, board) {
    this.currentColor_0 = currentColor;
    this.board_0 = board;
    this.startPosition_udb8uh$_0 = this.startPosition_udb8uh$_0;
    this.killerType_0 = 0;
    this.victims_0 = this.board_0.getCheckers_za3lpa$(1 - this.currentColor_0 | 0);
  }
  Object.defineProperty(MoveSearcher.prototype, 'startPosition_0', {
    get: function () {
      if (this.startPosition_udb8uh$_0 == null)
        return throwUPAE('startPosition');
      return this.startPosition_udb8uh$_0;
    },
    set: function (startPosition) {
      this.startPosition_udb8uh$_0 = startPosition;
    }
  });
  function MoveSearcher$Move(from, victim, to) {
    this.from_0 = from;
    this.victim_0 = victim;
    this.to = to;
  }
  MoveSearcher$Move.prototype.toList = function () {
    var tmp$;
    var list = ArrayList_init();
    list.add_11rb$(this.to);
    var move = {v: this.from_0};
    while (true) {
      var tmp$_0;
      if ((tmp$ = move.v) != null) {
        list.add_11rb$(tmp$.to);
        move.v = tmp$.from_0;
        tmp$_0 = Unit;
      }
       else
        tmp$_0 = null;
      if (tmp$_0 == null)
        break;
    }
    reverse(list);
    return list;
  };
  MoveSearcher$Move.prototype.getVictims = function () {
    var tmp$, tmp$_0;
    var victims = ArrayList_init();
    var curMove = this;
    while (true) {
      if ((tmp$ = curMove.victim_0) != null) {
        victims.add_11rb$(tmp$);
      }
      tmp$_0 = curMove.from_0;
      if (tmp$_0 == null) {
        break;
      }
      curMove = tmp$_0;
    }
    return victims;
  };
  MoveSearcher$Move.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Move',
    interfaces: []
  };
  MoveSearcher$Move.prototype.component1_0 = function () {
    return this.from_0;
  };
  MoveSearcher$Move.prototype.component2_0 = function () {
    return this.victim_0;
  };
  MoveSearcher$Move.prototype.component3 = function () {
    return this.to;
  };
  MoveSearcher$Move.prototype.copy_hod9az$ = function (from, victim, to) {
    return new MoveSearcher$Move(from === void 0 ? this.from_0 : from, victim === void 0 ? this.victim_0 : victim, to === void 0 ? this.to : to);
  };
  MoveSearcher$Move.prototype.toString = function () {
    return 'Move(from=' + Kotlin.toString(this.from_0) + (', victim=' + Kotlin.toString(this.victim_0)) + (', to=' + Kotlin.toString(this.to)) + ')';
  };
  MoveSearcher$Move.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.from_0) | 0;
    result = result * 31 + Kotlin.hashCode(this.victim_0) | 0;
    result = result * 31 + Kotlin.hashCode(this.to) | 0;
    return result;
  };
  MoveSearcher$Move.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.from_0, other.from_0) && Kotlin.equals(this.victim_0, other.victim_0) && Kotlin.equals(this.to, other.to)))));
  };
  MoveSearcher.prototype.nextMoves = function () {
    var tmp$;
    var $receiver = this.nextKillMoves_0();
    return (tmp$ = !$receiver.isEmpty() ? $receiver : null) != null ? tmp$ : this.nextStepMoves_0();
  };
  var UnsupportedOperationException_init = Kotlin.kotlin.UnsupportedOperationException;
  MoveSearcher.prototype.nextKillMoves_0 = function () {
    var $receiver = this.board_0.getCheckers_za3lpa$(this.currentColor_0);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      var tmp$_0 = destination.add_11rb$;
      this.startPosition_0 = item;
      this.killerType_0 = ensureNotNull(ensureNotNull(this.board_0.get_dfplqh$(item)).checker).type;
      tmp$_0.call(destination, this.getAttackPositionsList_0(item));
    }
    var destination_0 = ArrayList_init();
    var tmp$_1;
    tmp$_1 = destination.iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      var list = element;
      addAll(destination_0, list);
    }
    var destination_1 = ArrayList_init();
    var tmp$_2;
    tmp$_2 = destination_0.iterator();
    while (tmp$_2.hasNext()) {
      var element_0 = tmp$_2.next();
      if (!element_0.isEmpty())
        destination_1.add_11rb$(element_0);
    }
    var destination_2 = ArrayList_init(collectionSizeOrDefault(destination_1, 10));
    var tmp$_3;
    tmp$_3 = destination_1.iterator();
    while (tmp$_3.hasNext()) {
      var item_0 = tmp$_3.next();
      var tmp$_4 = destination_2.add_11rb$;
      var destination_3 = ArrayList_init(collectionSizeOrDefault(item_0, 10));
      var tmp$_5;
      tmp$_5 = item_0.iterator();
      while (tmp$_5.hasNext()) {
        var item_1 = tmp$_5.next();
        destination_3.add_11rb$(item_1.toString());
      }
      var iterator = destination_3.iterator();
      if (!iterator.hasNext())
        throw new UnsupportedOperationException_init("Empty collection can't be reduced.");
      var accumulator = iterator.next();
      while (iterator.hasNext()) {
        accumulator = accumulator + ':' + iterator.next();
      }
      tmp$_4.call(destination_2, accumulator);
    }
    return destination_2;
  };
  var wrapFunction = Kotlin.wrapFunction;
  var mapNotNullTo$lambda = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  MoveSearcher.prototype.getAttackPositionsList_0 = function (checkerPosition) {
    var $receiver = this.getKillerMoves_0(checkerPosition);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0;
      var $receiver_0 = element.toList();
      if ((tmp$_0 = $receiver_0.size > 1 ? $receiver_0 : null) != null) {
        destination.add_11rb$(tmp$_0);
      }
    }
    return destination;
  };
  MoveSearcher.prototype.getKillerMoves_0 = function (attackPosition) {
    var moves = ArrayList_init();
    this.getKillerMoves_1(new MoveSearcher$Move(null, null, attackPosition), moves);
    return moves;
  };
  MoveSearcher.prototype.getKillerMoves_1 = function (initMove, allMoves) {
    var move = initMove;
    while (true) {
      var killer = move.to;
      if (this.killerType_0 === 0 && (killer.y === 1 && this.currentColor_0 === 1 || (killer.y === 8 && this.currentColor_0 === 0)))
        this.killerType_0 = 1;
      var killed = move.getVictims();
      var $receiver = this.getNearbyVictims_0(killer, killed);
      var destination = ArrayList_init();
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (!this.isCheckersBetween_0(killer, element))
          destination.add_11rb$(element);
      }
      var nearbyVictims = destination;
      if (nearbyVictims.isEmpty())
        break;
      var nextStepMoves = this.nextStepsForMove_0(move, nearbyVictims, killed);
      if (nextStepMoves.isEmpty())
        break;
      if (nextStepMoves.size > 1) {
        var tmp$_0;
        tmp$_0 = nextStepMoves.iterator();
        while (tmp$_0.hasNext()) {
          var element_0 = tmp$_0.next();
          this.getKillerMoves_1(element_0, allMoves);
        }
        return;
      }
      move = first(nextStepMoves);
    }
    allMoves.add_11rb$(move);
  };
  MoveSearcher.prototype.nextStepsForMove_0 = function (move, nearbyVictims, killed) {
    var tmp$, tmp$_0;
    var moves = ArrayList_init();
    tmp$ = nearbyVictims.iterator();
    while (tmp$.hasNext()) {
      var victim = tmp$.next();
      tmp$_0 = this.getAfterAttackPositions_0(move.to, victim, killed);
      if (tmp$_0 == null) {
        continue;
      }
      var positions = tmp$_0;
      var destination = ArrayList_init(collectionSizeOrDefault(positions, 10));
      var tmp$_1;
      tmp$_1 = positions.iterator();
      while (tmp$_1.hasNext()) {
        var item = tmp$_1.next();
        destination.add_11rb$(new MoveSearcher$Move(move, victim, item));
      }
      moves.addAll_brywnq$(destination);
    }
    return moves;
  };
  var Collection = Kotlin.kotlin.collections.Collection;
  var mapNotNullTo$lambda_0 = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  MoveSearcher.prototype.getAfterAttackPositions_0 = function (killer, victim, killed) {
    var tmp$;
    var any$result;
    any$break: do {
      var tmp$_0;
      if (Kotlin.isType(killed, Collection) && killed.isEmpty()) {
        any$result = false;
        break any$break;
      }
      tmp$_0 = killed.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        if (this.isBetween_0(element, killer, victim)) {
          any$result = true;
          break any$break;
        }
      }
      any$result = false;
    }
     while (false);
    if (any$result)
      return null;
    var $receiver = this.findNextPositions_0(killer, victim);
    var tmp$_1;
    var list = ArrayList_init();
    tmp$_1 = $receiver.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      var tmp$_2;
      if (!(((tmp$_2 = this.board_0.get_dfplqh$(item)) != null ? tmp$_2.checker : null) == null || (item != null ? item.equals(this.startPosition_0) : null)))
        break;
      list.add_11rb$(item);
    }
    var nextPositions = list;
    if (nextPositions.isEmpty())
      return null;
    var destination = ArrayList_init();
    var tmp$_3;
    tmp$_3 = nextPositions.iterator();
    while (tmp$_3.hasNext()) {
      var element_0 = tmp$_3.next();
      var tmp$_0_0;
      var $receiver_0 = this.getNearbyVictims_0(element_0, killed);
      var any$result_0;
      any$break: do {
        var tmp$_4;
        if (Kotlin.isType($receiver_0, Collection) && $receiver_0.isEmpty()) {
          any$result_0 = false;
          break any$break;
        }
        tmp$_4 = $receiver_0.iterator();
        while (tmp$_4.hasNext()) {
          var element_1 = tmp$_4.next();
          if (!(element_1 != null ? element_1.equals(victim) : null)) {
            any$result_0 = true;
            break any$break;
          }
        }
        any$result_0 = false;
      }
       while (false);
      if ((tmp$_0_0 = any$result_0 ? element_0 : null) != null) {
        destination.add_11rb$(tmp$_0_0);
      }
    }
    var testPositions = destination;
    var $receiver_1 = (tmp$ = !testPositions.isEmpty() ? testPositions : null) != null ? tmp$ : nextPositions;
    var destination_0 = ArrayList_init();
    var tmp$_5;
    tmp$_5 = $receiver_1.iterator();
    while (tmp$_5.hasNext()) {
      var element_2 = tmp$_5.next();
      var destination_1 = ArrayList_init();
      var tmp$_6;
      tmp$_6 = killed.iterator();
      while (tmp$_6.hasNext()) {
        var element_3 = tmp$_6.next();
        if (this.isBetween_0(element_3, killer, element_2))
          destination_1.add_11rb$(element_3);
      }
      if (!any(destination_1))
        destination_0.add_11rb$(element_2);
    }
    return destination_0;
  };
  MoveSearcher.prototype.findNextPositions_0 = function (killerPosition, victimPosition) {
    var tmp$;
    if (this.killerType_0 === 0) {
      if ((tmp$ = this.findNextPositionForSimpleChecker_0(killerPosition, victimPosition)) != null) {
        return listOf_0(tmp$);
      }
      return emptyList();
    }
     else
      return this.findNextPositionsForQueen_0(killerPosition, victimPosition);
  };
  MoveSearcher.prototype.findNextPositionForSimpleChecker_0 = function (killerPosition, victimPosition) {
    var tmp$;
    var dx = victimPosition.x - killerPosition.x | 0;
    var dy = victimPosition.y - killerPosition.y | 0;
    tmp$ = killerPosition.next_vux9f0$(2 * dx | 0, 2 * dy | 0);
    if (tmp$ == null) {
      return null;
    }
    var to = tmp$;
    return (to != null ? to.equals(this.startPosition_0) : null) || ensureNotNull(this.board_0.get_dfplqh$(to)).checker == null ? to : null;
  };
  var mapNotNullTo$lambda_1 = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  MoveSearcher.prototype.findNextPositionsForQueen_0 = function (killerPosition, victimPosition) {
    var dx = (victimPosition.x - killerPosition.x | 0) < 0 ? -1 : 1;
    var dy = (victimPosition.y - killerPosition.y | 0) < 0 ? -1 : 1;
    var $receiver = new IntRange(1, 8);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0;
      if ((tmp$_0 = victimPosition.next_vux9f0$(Kotlin.imul(element, dx), Kotlin.imul(element, dy))) != null) {
        destination.add_11rb$(tmp$_0);
      }
    }
    return destination;
  };
  MoveSearcher.prototype.getNearbyVictims_0 = function (killerPosition, killed) {
    var $receiver = this.findVictims_0(this.victims_0, killerPosition);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (!killed.contains_11rb$(element))
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init();
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      if (this.checkChecker_0(killerPosition, element_0))
        destination_0.add_11rb$(element_0);
    }
    return destination_0;
  };
  var Math_0 = Math;
  var mapNotNullTo$lambda_2 = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  MoveSearcher.prototype.isCheckersBetween_0 = function (a, b) {
    var tmp$, tmp$_0;
    var dx = (tmp$ = (a.x - b.x | 0) < 0 ? 1 : null) != null ? tmp$ : -1;
    var dy = (tmp$_0 = (a.y - b.y | 0) < 0 ? 1 : null) != null ? tmp$_0 : -1;
    var a_0 = a.x;
    var b_0 = b.x;
    var x1 = Math_0.min(a_0, b_0) + 1 | 0;
    var a_1 = a.x;
    var b_1 = b.x;
    var x2 = Math_0.max(a_1, b_1) - 1 | 0;
    var a_2 = a.y;
    var b_2 = b.y;
    var y1 = Math_0.min(a_2, b_2) + 1 | 0;
    var a_3 = a.y;
    var b_3 = b.y;
    var y2 = Math_0.max(a_3, b_3) - 1 | 0;
    var $receiver = until(1, 8);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_1;
    tmp$_1 = $receiver.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination.add_11rb$(new Position(a.x + Kotlin.imul(dx, item) | 0, a.y + Kotlin.imul(dy, item) | 0));
    }
    var tmp$_2;
    var list = ArrayList_init();
    tmp$_2 = destination.iterator();
    while (tmp$_2.hasNext()) {
      var item_0 = tmp$_2.next();
      if (!((new IntRange(x1, x2)).contains_mef7kx$(abs(item_0.x)) && (new IntRange(y1, y2)).contains_mef7kx$(abs(item_0.y))))
        break;
      list.add_11rb$(item_0);
    }
    var destination_0 = ArrayList_init();
    var tmp$_3;
    tmp$_3 = list.iterator();
    while (tmp$_3.hasNext()) {
      var element = tmp$_3.next();
      var tmp$_0_0;
      var tmp$_4;
      if ((tmp$_0_0 = (tmp$_4 = this.board_0.get_dfplqh$(element)) != null ? tmp$_4.checker : null) != null) {
        destination_0.add_11rb$(tmp$_0_0);
      }
    }
    return any(destination_0);
  };
  MoveSearcher.prototype.findVictims_0 = function (victims, killerPosition) {
    if (this.killerType_0 === 0) {
      var destination = ArrayList_init();
      var tmp$;
      tmp$ = victims.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (abs(killerPosition.x - element.x | 0) === 1 && abs(killerPosition.y - element.y | 0) === 1)
          destination.add_11rb$(element);
      }
      return destination;
    }
     else {
      var destination_0 = ArrayList_init();
      var tmp$_0;
      tmp$_0 = victims.iterator();
      while (tmp$_0.hasNext()) {
        var element_0 = tmp$_0.next();
        if (this.isOneDiagonal_0(killerPosition, element_0))
          destination_0.add_11rb$(element_0);
      }
      return destination_0;
    }
  };
  MoveSearcher.prototype.checkChecker_0 = function (killer, victim) {
    var tmp$, tmp$_0;
    var dx = victim.x - killer.x | 0;
    var dy = victim.y - killer.y | 0;
    var xAfter = victim.x + (dx < 0 ? -1 : 1) | 0;
    var yAfter = victim.y + (dy < 0 ? -1 : 1) | 0;
    var xBefore = victim.x + (dx < 0 ? 1 : -1) | 0;
    var yBefore = victim.y + (dy < 0 ? 1 : -1) | 0;
    if (!((new IntRange(1, 8)).contains_mef7kx$(xBefore) && (new IntRange(1, 8)).contains_mef7kx$(yBefore) && (new IntRange(1, 8)).contains_mef7kx$(xAfter) && (new IntRange(1, 8)).contains_mef7kx$(yAfter)))
      return false;
    var after = new Position(xAfter, yAfter);
    var before = new Position(xBefore, yBefore);
    var checkerAfter = (tmp$ = this.board_0.get_dfplqh$(after)) != null ? tmp$.checker : null;
    var checkerBefore = (tmp$_0 = this.board_0.get_dfplqh$(before)) != null ? tmp$_0.checker : null;
    return ((after != null ? after.equals(this.startPosition_0) : null) || checkerAfter == null) && ((before != null ? before.equals(killer) : null) || checkerBefore == null);
  };
  MoveSearcher.prototype.isOneDiagonal_0 = function (pos1, pos2) {
    return abs(pos1.x - pos2.x | 0) === abs(pos1.y - pos2.y | 0);
  };
  MoveSearcher.prototype.isBetween_0 = function (pos, a, b) {
    if (!this.isOneDiagonal_0(pos, a) || !this.isOneDiagonal_0(pos, b) || !this.isOneDiagonal_0(a, b))
      return false;
    var dAB = abs(b.x - a.x | 0);
    var dA = abs(pos.x - a.x | 0);
    var dB = abs(pos.x - b.x | 0);
    return dAB >= dA && dAB >= dB;
  };
  var mapNotNullTo$lambda_3 = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  MoveSearcher.prototype.nextStepMoves_0 = function () {
    var $receiver = this.board_0.getCheckers_za3lpa$(this.currentColor_0);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0;
      var tmp$_1;
      var tmp$_2;
      if ((tmp$_1 = this.findMoveWay_0(element)) != null) {
        var destination_0 = ArrayList_init(collectionSizeOrDefault(tmp$_1, 10));
        var tmp$_3;
        tmp$_3 = tmp$_1.iterator();
        while (tmp$_3.hasNext()) {
          var item = tmp$_3.next();
          destination_0.add_11rb$(listOf([element, item]));
        }
        tmp$_2 = destination_0;
      }
       else
        tmp$_2 = null;
      if ((tmp$_0 = tmp$_2) != null) {
        destination.add_11rb$(tmp$_0);
      }
    }
    var destination_1 = ArrayList_init();
    var tmp$_4;
    tmp$_4 = destination.iterator();
    while (tmp$_4.hasNext()) {
      var element_0 = tmp$_4.next();
      var list = element_0;
      addAll(destination_1, list);
    }
    var destination_2 = ArrayList_init(collectionSizeOrDefault(destination_1, 10));
    var tmp$_5;
    tmp$_5 = destination_1.iterator();
    while (tmp$_5.hasNext()) {
      var item_0 = tmp$_5.next();
      var tmp$_6 = destination_2.add_11rb$;
      var destination_3 = ArrayList_init(collectionSizeOrDefault(item_0, 10));
      var tmp$_7;
      tmp$_7 = item_0.iterator();
      while (tmp$_7.hasNext()) {
        var item_1 = tmp$_7.next();
        destination_3.add_11rb$(item_1.toString());
      }
      var iterator = destination_3.iterator();
      if (!iterator.hasNext())
        throw new UnsupportedOperationException_init("Empty collection can't be reduced.");
      var accumulator = iterator.next();
      while (iterator.hasNext()) {
        accumulator = accumulator + '-' + iterator.next();
      }
      tmp$_6.call(destination_2, accumulator);
    }
    return destination_2;
  };
  var mapNotNullTo$lambda_4 = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  var mapNotNullTo$lambda_5 = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  MoveSearcher.prototype.findMoveWay_0 = function (pos) {
    var tmp$, tmp$_0;
    tmp$ = ensureNotNull(this.board_0.get_dfplqh$(pos)).checker;
    if (tmp$ == null) {
      return null;
    }
    var checker = tmp$;
    if (checker.type === 0) {
      var dy = checker.color === 0 ? 1 : -1;
      var $receiver = listOf([-1, 1]);
      var destination = ArrayList_init();
      var tmp$_1;
      tmp$_1 = $receiver.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        var tmp$_0_0;
        if ((tmp$_0_0 = pos.next_vux9f0$(element, dy)) != null) {
          destination.add_11rb$(tmp$_0_0);
        }
      }
      var destination_0 = ArrayList_init();
      var tmp$_2;
      tmp$_2 = destination.iterator();
      while (tmp$_2.hasNext()) {
        var element_0 = tmp$_2.next();
        var tmp$_0_1;
        var tmp$_3;
        if ((tmp$_0_1 = ((tmp$_3 = this.board_0.get_dfplqh$(element_0)) != null ? tmp$_3.checker : null) == null ? element_0 : null) != null) {
          destination_0.add_11rb$(tmp$_0_1);
        }
      }
      tmp$_0 = destination_0;
    }
     else {
      var $receiver_0 = listOf([listOf([-1, 1]), listOf([1, 1]), listOf([-1, -1]), listOf([1, -1])]);
      var destination_1 = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
      var tmp$_4;
      tmp$_4 = $receiver_0.iterator();
      while (tmp$_4.hasNext()) {
        var item = tmp$_4.next();
        var tmp$_5 = destination_1.add_11rb$;
        var dx = item.get_za3lpa$(0);
        var dy_0 = item.get_za3lpa$(1);
        var $receiver_1 = new IntRange(1, 8);
        var destination_2 = ArrayList_init();
        var tmp$_6;
        tmp$_6 = $receiver_1.iterator();
        while (tmp$_6.hasNext()) {
          var element_1 = tmp$_6.next();
          var tmp$_0_2;
          if ((tmp$_0_2 = pos.next_vux9f0$(Kotlin.imul(dx, element_1), Kotlin.imul(dy_0, element_1))) != null) {
            destination_2.add_11rb$(tmp$_0_2);
          }
        }
        var tmp$_7;
        var list = ArrayList_init();
        tmp$_7 = destination_2.iterator();
        while (tmp$_7.hasNext()) {
          var item_0 = tmp$_7.next();
          var tmp$_8;
          if (!(((tmp$_8 = this.board_0.get_dfplqh$(item_0)) != null ? tmp$_8.checker : null) == null))
            break;
          list.add_11rb$(item_0);
        }
        tmp$_5.call(destination_1, list);
      }
      var destination_3 = ArrayList_init();
      var tmp$_9;
      tmp$_9 = destination_1.iterator();
      while (tmp$_9.hasNext()) {
        var element_2 = tmp$_9.next();
        var list_0 = element_2;
        addAll(destination_3, list_0);
      }
      tmp$_0 = destination_3;
    }
    return tmp$_0;
  };
  MoveSearcher.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MoveSearcher',
    interfaces: []
  };
  function NetworkIO() {
  }
  NetworkIO.prototype.load = function () {
    var lines = split(net, ['\n']);
    var nw = new Network(new Int32Array([]));
    var layer = {v: null};
    var neuron = {v: null};
    var tmp$;
    tmp$ = lines.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0, tmp$_1;
      if (equals(element, 'layer')) {
        if ((tmp$_0 = layer.v) != null) {
          tmp$_0.neurons.add_11rb$(ensureNotNull(neuron.v));
          nw.layers.add_11rb$(tmp$_0);
          neuron.v = null;
        }
        layer.v = new Layer();
      }
       else if (equals(element, 'neuron')) {
        if ((tmp$_1 = neuron.v) != null) {
          ensureNotNull(layer.v).neurons.add_11rb$(tmp$_1);
        }
        neuron.v = new Neuron();
      }
       else if (equals(element, 'end')) {
        ensureNotNull(layer.v).neurons.add_11rb$(ensureNotNull(neuron.v));
        nw.layers.add_11rb$(ensureNotNull(layer.v));
      }
       else {
        ensureNotNull(neuron.v).weights.add_11rb$(toDouble(element));
      }
    }
    return nw;
  };
  NetworkIO.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NetworkIO',
    interfaces: []
  };
  function Player(nw, predicateMoves, error, debug) {
    if (predicateMoves === void 0)
      predicateMoves = 4;
    if (error === void 0)
      error = 3.0;
    if (debug === void 0)
      debug = false;
    this.nw_0 = nw;
    this.predicateMoves_0 = predicateMoves;
    this.error = error;
    this.debug_0 = debug;
  }
  Player.prototype.selectMove_ydazgc$ = function (checkerboard, color, steps) {
    var destination = ArrayList_init(collectionSizeOrDefault(steps, 10));
    var tmp$;
    tmp$ = steps.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(to(item, this.play_0(checkerboard, color, this.predicateMoves_0, item)));
    }
    var $receiver = toList_0(destination);
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (this.debug_0)
        println(element);
    }
    var list = $receiver;
    var maxBy$result;
    maxBy$break: do {
      var iterator = list.iterator();
      if (!iterator.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator.next();
      var maxValue = maxElem.second;
      while (iterator.hasNext()) {
        var e = iterator.next();
        var v = e.second;
        if (Kotlin.compareTo(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    var max = ensureNotNull(maxBy$result).second;
    var destination_0 = ArrayList_init();
    var tmp$_1;
    tmp$_1 = list.iterator();
    while (tmp$_1.hasNext()) {
      var element_0 = tmp$_1.next();
      if (element_0.second === max)
        destination_0.add_11rb$(element_0);
    }
    var destination_1 = ArrayList_init(collectionSizeOrDefault(destination_0, 10));
    var tmp$_2;
    tmp$_2 = destination_0.iterator();
    while (tmp$_2.hasNext()) {
      var item_0 = tmp$_2.next();
      destination_1.add_11rb$(item_0.first);
    }
    var l = destination_1;
    var step = this.selectBestStep_0(checkerboard, color, l, this.debug_0);
    if (this.debug_0)
      println(step);
    return step;
  };
  Player.prototype.play_0 = function (checkerboard, initColor, count, initStep) {
    var tmp$;
    var game = new GameController(checkerboard.clone());
    game.currentColor = initColor;
    var steps = game.nextMoves();
    tmp$ = count * 2 | 0;
    for (var i = 0; i < tmp$; i++) {
      var step = i === 0 ? initStep : this.selectBestStep_0(game.checkerboard, game.currentColor, steps);
      game.go(step);
      game.currentColor = 1 - game.currentColor | 0;
      steps = game.nextMoves();
      if (steps.isEmpty()) {
        return game.currentColor !== initColor ? 100 - i | 0 : -100 + i | 0;
      }
    }
    var $receiver = game.checkerboard.encodeToVector();
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element > 0)
        destination.add_11rb$(element);
    }
    var whiteCount = destination.size;
    var $receiver_0 = game.checkerboard.encodeToVector();
    var destination_0 = ArrayList_init();
    var tmp$_1;
    tmp$_1 = $receiver_0.iterator();
    while (tmp$_1.hasNext()) {
      var element_0 = tmp$_1.next();
      if (element_0 < 0)
        destination_0.add_11rb$(element_0);
    }
    var blackCount = destination_0.size;
    return initColor === 0 ? whiteCount - blackCount | 0 : blackCount - whiteCount | 0;
  };
  Player.prototype.selectBestStep_0 = function (checkerboard, color, steps, debug) {
    if (debug === void 0)
      debug = false;
    var tmp$;
    if (steps.isEmpty())
      return '';
    if (steps.size === 1)
      return steps.get_za3lpa$(0);
    var destination = ArrayList_init(collectionSizeOrDefault(steps, 10));
    var tmp$_0;
    tmp$_0 = steps.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination.add_11rb$(to(item, new GameController(checkerboard.clone())));
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_1;
    tmp$_1 = destination.iterator();
    while (tmp$_1.hasNext()) {
      var item_0 = tmp$_1.next();
      var tmp$_2 = destination_0.add_11rb$;
      var command = item_0.component1()
      , game = item_0.component2();
      game.go(command);
      var vector = game.checkerboard.encodeToVector();
      var o = this.nw_0.multiActivate_38ehy6$((new InputEncoder()).encode_d3e2cz$(vector));
      tmp$_2.call(destination_0, to(command, o.get_za3lpa$(0)));
    }
    var $receiver = toList_0(destination_0);
    var destination_1 = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_3;
    tmp$_3 = $receiver.iterator();
    while (tmp$_3.hasNext()) {
      var item_1 = tmp$_3.next();
      destination_1.add_11rb$(to(item_1.first, item_1.second * (this.error > 0 ? 1 + this.error - Math.random() * (2 * this.error) / 100 : 1.0)));
    }
    var list = destination_1;
    if (color === 0) {
      var maxBy$result;
      maxBy$break: do {
        var iterator = list.iterator();
        if (!iterator.hasNext()) {
          maxBy$result = null;
          break maxBy$break;
        }
        var maxElem = iterator.next();
        var maxValue = maxElem.second;
        while (iterator.hasNext()) {
          var e = iterator.next();
          var v = e.second;
          if (Kotlin.compareTo(maxValue, v) < 0) {
            maxElem = e;
            maxValue = v;
          }
        }
        maxBy$result = maxElem;
      }
       while (false);
      tmp$ = ensureNotNull(maxBy$result);
    }
     else {
      var minBy$result;
      minBy$break: do {
        var iterator_0 = list.iterator();
        if (!iterator_0.hasNext()) {
          minBy$result = null;
          break minBy$break;
        }
        var minElem = iterator_0.next();
        var minValue = minElem.second;
        while (iterator_0.hasNext()) {
          var e_0 = iterator_0.next();
          var v_0 = e_0.second;
          if (Kotlin.compareTo(minValue, v_0) > 0) {
            minElem = e_0;
            minValue = v_0;
          }
        }
        minBy$result = minElem;
      }
       while (false);
      tmp$ = ensureNotNull(minBy$result);
    }
    var step = tmp$;
    if (debug) {
      println(step);
    }
    return step.first;
  };
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  var net;
  function Checker(color, type) {
    if (type === void 0)
      type = 0;
    this.color = color;
    this.type = type;
  }
  Checker.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Checker',
    interfaces: []
  };
  Checker.prototype.component1 = function () {
    return this.color;
  };
  Checker.prototype.component2 = function () {
    return this.type;
  };
  Checker.prototype.copy_vux9f0$ = function (color, type) {
    return new Checker(color === void 0 ? this.color : color, type === void 0 ? this.type : type);
  };
  Checker.prototype.toString = function () {
    return 'Checker(color=' + Kotlin.toString(this.color) + (', type=' + Kotlin.toString(this.type)) + ')';
  };
  Checker.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.color) | 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    return result;
  };
  Checker.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.color, other.color) && Kotlin.equals(this.type, other.type)))));
  };
  function Field(x, y, color, checker) {
    if (checker === void 0)
      checker = null;
    this.x = x;
    this.y = y;
    this.color = color;
    this.checker = checker;
  }
  Field.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Field',
    interfaces: []
  };
  Field.prototype.component1 = function () {
    return this.x;
  };
  Field.prototype.component2 = function () {
    return this.y;
  };
  Field.prototype.component3 = function () {
    return this.color;
  };
  Field.prototype.component4 = function () {
    return this.checker;
  };
  Field.prototype.copy_ds21zo$ = function (x, y, color, checker) {
    return new Field(x === void 0 ? this.x : x, y === void 0 ? this.y : y, color === void 0 ? this.color : color, checker === void 0 ? this.checker : checker);
  };
  Field.prototype.toString = function () {
    return 'Field(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + (', color=' + Kotlin.toString(this.color)) + (', checker=' + Kotlin.toString(this.checker)) + ')';
  };
  Field.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    result = result * 31 + Kotlin.hashCode(this.color) | 0;
    result = result * 31 + Kotlin.hashCode(this.checker) | 0;
    return result;
  };
  Field.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y) && Kotlin.equals(this.color, other.color) && Kotlin.equals(this.checker, other.checker)))));
  };
  function Position(x, y) {
    this.x = x;
    this.y = y;
  }
  Position.prototype.toString = function () {
    var ch = String.fromCharCode(toChar(toChar(97 + this.x) - 1));
    return ch + this.y;
  };
  Position.prototype.equals = function (other) {
    var tmp$;
    if (this === other)
      return true;
    Kotlin.isType(tmp$ = other, Position) ? tmp$ : throwCCE();
    return this.x === other.x && this.y === other.y;
  };
  Position.prototype.hashCode = function () {
    return (31 * this.x | 0) + this.y | 0;
  };
  Position.prototype.next_vux9f0$ = function (dx, dy) {
    var x = this.x + dx | 0;
    var y = this.y + dy | 0;
    if (y < 1 || y > 8 || x < 1 || x > 8)
      return null;
    return new Position(x, y);
  };
  Position.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Position',
    interfaces: []
  };
  function Position_init(s, $this) {
    $this = $this || Object.create(Position.prototype);
    Position.call($this, getX(s), getY(s));
    return $this;
  }
  function getX($receiver) {
    var $receiver_0 = new CharRange(97, 104);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
    var tmp$;
    tmp$ = $receiver_0.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(to(String.fromCharCode(unboxChar(item)), (unboxChar(item) | 0) - 96 | 0));
    }
    return ensureNotNull(toMap(destination).get_11rb$($receiver.substring(0, 1)));
  }
  function getY($receiver) {
    return toInt($receiver.substring(1, 2));
  }
  function Checkerboard() {
    this.board = null;
    var $receiver = new IntRange(1, 8);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var $receiver_0 = new IntRange(1, 8);
      var destination_0 = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
      var tmp$_0;
      tmp$_0 = $receiver_0.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination_0.add_11rb$(new Field(item, element, (item + element + 1 | 0) % 2));
      }
      var list = destination_0;
      addAll(destination, list);
    }
    this.board = destination;
  }
  Checkerboard.prototype.get_0 = function (x, y) {
    var $receiver = this.board;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element.x === x && element.y === y) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    return firstOrNull$result;
  };
  Checkerboard.prototype.get_dfplqh$ = function (pos) {
    return this.get_0(pos.x, pos.y);
  };
  Checkerboard.prototype.get_61zpoe$ = function (pos) {
    return this.get_dfplqh$(Position_init(pos));
  };
  Checkerboard.prototype.print = function () {
    var tmp$;
    tmp$ = downTo(8, 1).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      print(element.toString() + '| ');
      var tmp$_0;
      tmp$_0 = (new IntRange(1, 8)).iterator();
      while (tmp$_0.hasNext()) {
        var element_0 = tmp$_0.next();
        var tmp$_1;
        var field = ensureNotNull(this.get_0(element_0, element));
        var block$result;
        var tmp$_2, tmp$_3;
        if (((tmp$_2 = field.checker) != null ? tmp$_2.color : null) === 0 && ((tmp$_3 = field.checker) != null ? tmp$_3.type : null) === 0) {
          block$result = 'o';
        }
         else {
          var tmp$_4, tmp$_5;
          if (((tmp$_4 = field.checker) != null ? tmp$_4.color : null) === 0 && ((tmp$_5 = field.checker) != null ? tmp$_5.type : null) === 1) {
            block$result = '@';
          }
           else {
            var tmp$_6, tmp$_7;
            if (((tmp$_6 = field.checker) != null ? tmp$_6.color : null) === 1 && ((tmp$_7 = field.checker) != null ? tmp$_7.type : null) === 0) {
              block$result = 'x';
            }
             else {
              var tmp$_8, tmp$_9;
              if (((tmp$_8 = field.checker) != null ? tmp$_8.color : null) === 1 && ((tmp$_9 = field.checker) != null ? tmp$_9.type : null) === 1) {
                block$result = '#';
              }
               else {
                block$result = ' ';
              }
            }
          }
        }
        var checker = block$result;
        print((tmp$_1 = field.color === 0 ? '   ' : null) != null ? tmp$_1 : '[' + checker + ']');
      }
      println_0();
    }
    println('    a  b  c  d  e  f  g  h');
  };
  Checkerboard.prototype.place_0 = function (x, y, checker) {
    if ((checker != null ? checker.type : null) === 0 && (y === 8 && checker.color === 0 || (y === 1 && checker.color === 1)))
      checker.type = 1;
    ensureNotNull(this.get_0(x, y)).checker = checker;
  };
  Checkerboard.prototype.place_1 = function (pos, checker) {
    this.place_0(pos.x, pos.y, checker);
  };
  Checkerboard.prototype.place_dyx5dk$ = function (pos, checker) {
    this.place_1(Position_init(pos), checker);
  };
  Checkerboard.prototype.move_puj7f4$ = function (from, to) {
    var checker = ensureNotNull(this.get_61zpoe$(from)).checker;
    this.place_dyx5dk$(from, null);
    this.place_dyx5dk$(to, checker);
  };
  Checkerboard.prototype.remove_0 = function (x, y) {
    this.place_0(x, y, null);
  };
  Checkerboard.prototype.remove_1 = function (from, to) {
    var dx = (to.x - from.x | 0) < 0 ? -1 : 1;
    var dy = (to.y - from.y | 0) < 0 ? -1 : 1;
    var tmp$;
    tmp$ = (new IntRange(0, abs(to.x - from.x | 0))).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.remove_0(from.x + Kotlin.imul(element, dx) | 0, from.y + Kotlin.imul(element, dy) | 0);
    }
  };
  Checkerboard.prototype.remove_puj7f4$ = function (from, to) {
    this.remove_1(Position_init(from), Position_init(to));
  };
  Checkerboard.prototype.getCheckers_za3lpa$ = function (color) {
    var $receiver = this.board;
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.checker != null && ensureNotNull(element.checker).color === color)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination_0.add_11rb$(new Position(item.x, item.y));
    }
    return destination_0;
  };
  Checkerboard.prototype.clear_0 = function () {
    var tmp$;
    tmp$ = this.board.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.checker = null;
    }
  };
  Checkerboard.prototype.clone = function () {
    var tmp$, tmp$_0;
    var clone = new Checkerboard();
    tmp$ = this.board.iterator();
    while (tmp$.hasNext()) {
      var field = tmp$.next();
      var checker = field.checker;
      (tmp$_0 = clone.get_0(field.x, field.y)) != null ? (tmp$_0.checker = checker == null ? null : new Checker(checker.color, checker.type)) : null;
    }
    return clone;
  };
  Checkerboard.prototype.encodeToVector = function () {
    var $receiver = this.board;
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.color === 1)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      var tmp$_1 = destination_0.add_11rb$;
      var transform$result;
      transform$break: do {
        var tmp$_2;
        tmp$_2 = item.checker;
        if (tmp$_2 == null) {
          transform$result = 0.0;
          break transform$break;
        }
        var checker = tmp$_2;
        if (checker.color === 0 && checker.type === 0) {
          transform$result = 1.0;
          break transform$break;
        }
        if (checker.color === 0 && checker.type === 1) {
          transform$result = 3.0;
          break transform$break;
        }
        transform$result = checker.color === 1 && checker.type === 0 ? -1.0 : -3.0;
      }
       while (false);
      tmp$_1.call(destination_0, transform$result);
    }
    return destination_0;
  };
  Checkerboard.prototype.init_2mkhiy$ = function (whiteCheckers, blackCheckers) {
    this.clear_0();
    var tmp$;
    tmp$ = whiteCheckers.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.place_dyx5dk$(element, new Checker(0));
    }
    var tmp$_0;
    tmp$_0 = blackCheckers.iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      this.place_dyx5dk$(element_0, new Checker(1));
    }
  };
  Checkerboard.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Checkerboard',
    interfaces: []
  };
  function Neuron() {
    this.a_0 = 1.0;
    this.b_0 = 2.0 / 3.0;
    this.weights = ArrayList_init();
  }
  Neuron.prototype.activate_d3e2cz$ = function (input) {
    var x = listOf([1.0].concat(copyToArray(input)));
    var tmp$ = this.a_0;
    var x_0 = this.b_0 * this.sum_0(x);
    return tmp$ * Math_0.tanh(x_0);
  };
  Neuron.prototype.sum_0 = function (input) {
    var $receiver = this.weights;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$, tmp$_0;
    var index = 0;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(input.get_za3lpa$((tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0)) * item);
    }
    return sum(destination);
  };
  Neuron.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Neuron',
    interfaces: []
  };
  function Layer(size) {
    if (size === void 0)
      size = 0;
    var size_0 = size;
    var list = ArrayList_init(size_0);
    var tmp$;
    tmp$ = size_0 - 1 | 0;
    for (var index = 0; index <= tmp$; index++) {
      list.add_11rb$(new Neuron());
    }
    this.neurons = list;
  }
  Layer.prototype.activate_d3e2cz$ = function (input) {
    var $receiver = this.neurons;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.activate_d3e2cz$(input));
    }
    return destination;
  };
  Layer.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Layer',
    interfaces: []
  };
  function Network(layerSize) {
    var list = ArrayList_init(layerSize.length);
    var tmp$;
    tmp$ = layerSize.length - 1 | 0;
    for (var index = 0; index <= tmp$; index++) {
      list.add_11rb$(new Layer(layerSize[index]));
    }
    this.layers = list;
  }
  Network.prototype.multiActivate_38ehy6$ = function (x) {
    var tmp$;
    var $receiver = this.layers.get_za3lpa$(0).neurons;
    if ($receiver.size !== x.size) {
      $receiver.clear();
      var size = x.size;
      var list = ArrayList_init(size);
      var tmp$_0;
      tmp$_0 = size - 1 | 0;
      for (var index = 0; index <= tmp$_0; index++) {
        list.add_11rb$(new Neuron());
      }
      $receiver.addAll_brywnq$(list);
    }
    var $receiver_0 = this.layers.get_za3lpa$(0).neurons;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
    var tmp$_1, tmp$_0_0;
    var index_0 = 0;
    tmp$_1 = $receiver_0.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination.add_11rb$(item.activate_d3e2cz$(x.get_za3lpa$((tmp$_0_0 = index_0, index_0 = tmp$_0_0 + 1 | 0, tmp$_0_0))));
    }
    var y = destination;
    tmp$ = this.layers.size;
    for (var i = 1; i < tmp$; i++) {
      y = this.layers.get_za3lpa$(i).activate_d3e2cz$(y);
    }
    return y;
  };
  Network.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Network',
    interfaces: []
  };
  function generateCSSAnimation$lambda$lambda(closure$letters) {
    return function (pos) {
      return to(closure$letters.indexOf_11rb$(pos.substring(0, 1)), toInt(pos.substring(1, 2)) - 1 | 0);
    };
  }
  function generateCSSAnimation$lambda(closure$letters, closure$fieldWidth) {
    return function (from, to_0) {
      var getCoordinates = generateCSSAnimation$lambda$lambda(closure$letters);
      var coordFrom = getCoordinates(from);
      var coordTo = getCoordinates(to_0);
      var dx = Kotlin.imul(-coordFrom.first + coordTo.first | 0, closure$fieldWidth);
      var dy = Kotlin.imul(coordFrom.second - coordTo.second | 0, closure$fieldWidth);
      return to(dx, dy);
    };
  }
  function generateCSSAnimation(points, fieldWidth) {
    if (fieldWidth === void 0)
      fieldWidth = 41;
    var letters = listOf(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    var translate = generateCSSAnimation$lambda(letters, fieldWidth);
    var $receiver = until(0, points.length);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(to(item, translate(points[0], points[item])));
    }
    var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item_0 = tmp$_0.next();
      destination_0.add_11rb$(to((item_0.first * 100 | 0) / (points.length - 1 | 0) | 0, item_0.second));
    }
    var destination_1 = ArrayList_init(collectionSizeOrDefault(destination_0, 10));
    var tmp$_1;
    tmp$_1 = destination_0.iterator();
    while (tmp$_1.hasNext()) {
      var item_1 = tmp$_1.next();
      destination_1.add_11rb$(item_1.first.toString() + '% { transform: translate(' + item_1.second.first + 'px,' + item_1.second.second + 'px); }');
    }
    var iterator = destination_1.iterator();
    if (!iterator.hasNext())
      throw new UnsupportedOperationException_init("Empty collection can't be reduced.");
    var accumulator = iterator.next();
    while (iterator.hasNext()) {
      accumulator = accumulator + '\n' + iterator.next();
    }
    return accumulator;
  }
  _.GameController = GameController;
  _.InputEncoder = InputEncoder;
  MoveSearcher.Move = MoveSearcher$Move;
  _.MoveSearcher = MoveSearcher;
  _.NetworkIO = NetworkIO;
  _.Player = Player;
  Object.defineProperty(_, 'net', {
    get: function () {
      return net;
    }
  });
  _.Checker = Checker;
  _.Field = Field;
  _.Position_init_61zpoe$ = Position_init;
  _.Position = Position;
  _.Checkerboard = Checkerboard;
  _.Neuron = Neuron;
  _.Layer = Layer;
  _.Network = Network;
  _.generateCSSAnimation = generateCSSAnimation;
  net = 'layer\nneuron\n-6.309144725523026\n0.9416718644953637\n6.101206001657009\n-3.329371933305292\n-7.090516731606337\nneuron\n-8.620489168635332\n-2.1628754562876007\n1.946476908069601\n-0.5212506244673754\n7.526642160176076\n-3.3843676337169537\nneuron\n7.413046389703222\n0.8501492394181454\n-6.547401059233364\n8.793101394476299\n-0.6504875236895691\nneuron\n6.549518873713939\n-8.373797622460977\n-5.500053626520991\n9.277618768856097\n5.350424846701685\n6.644499561015635\nneuron\n2.189867467766522\n-0.7166185077037035\n-7.534291514190832\n7.588520479084497\n-0.818897353734731\nneuron\n-5.7356348403911035\n8.051652382018968\n0.17457942986446762\n-1.969432033860048\n-0.018829869395220467\n8.521804367448116\nneuron\n-1.7698696882561604\n-1.1989396487943083\n5.265631556288959\n4.515872288673317\n8.021818763990929\n2.0855403878095236\nneuron\n-0.482917186948697\n-1.988058543718858\n-4.063498446967255\n-3.158990772233754\n6.290616702375238\nneuron\n-5.214299303802488\n-0.29808448381057007\n0.6799616496035155\n4.108496691704364\n8.092530881257428\n4.062787386112889\nneuron\n-4.359452921257372\n7.701680125335512\n-1.8185564775590768\n9.439234486352186\n-4.477621723278931\nneuron\n1.3736051787584747\n-7.78516112520003\n-9.906141295064712\n-6.933333230098513\n-0.5819229678452187\n3.704616839131356\nneuron\n-1.3457547515342427\n4.323457420538624\n3.6402471405675962\n6.660745615494836\n-8.82481474318472\nneuron\n-2.549451555658415\n2.088241085306135\n-4.32513814757211\n6.356998469650956\n3.034143576399184\nneuron\n-0.29258010431534975\n-5.613112368534246\n9.213755590781505\n4.716181503359569\n-2.8504177664003283\n-9.887171225820115\nneuron\n1.7048196432449148\n4.824202007286931\n-9.594615914309282\n-7.503051718132032\n-2.698570266075495\nneuron\n-4.936749202817412\n-1.0892613797038364\n-5.743016272825017\n-2.3367579274718797\n-2.72208593512715\n6.305491352230597\nneuron\n-6.6616261560292545\n6.211456155087447\n-0.3222137163034855\n-7.7659401602475135\n4.957375201285055\nneuron\n-2.67456371493048\n-0.356600995133729\n-2.8286234206542127\n-9.447302842717066\n5.0487938543114925\n3.1123128265185906\nneuron\n-7.536376439798575\n5.141798212216731\n-1.600432397591649\n5.960740588882711\n-3.565109640785984\n-5.592212433711947\nneuron\n6.913847968832041\n5.91804463506781\n-5.279210050519712\n-4.201313234842409\n2.1867730084952197\nneuron\n9.283167270948793\n-9.237401176769328\n7.630561784235368\n-6.4237504441773385\n0.45588151176580105\n3.0707376874200487\nneuron\n-7.375190723204921\n8.878116329631753\n-2.794645470587429\n-3.7340856414034884\n-6.308737769376263\nneuron\n-1.110748517160438\n-2.725595969759824\n3.228429020745509\n-6.878017166313873\n-1.6404669906193403\n-0.3866359697244204\nneuron\n8.198040664757446\n6.21360572884673\n-8.28597980464833\n-8.039951433726106\n2.5426976750461394\nneuron\n-8.605978666957565\n-3.6753609197862214\n-7.877260776248889\n9.257709287364406\n-0.3501973533310476\nneuron\n-4.817825933635609\n0.7853558780916181\n6.672448638581219\n-2.524149748899931\n4.36012685808304\n5.637596057452341\nneuron\n-0.0240320360800772\n-4.076921350361486\n6.345467439015033\n-3.898135161086249\n-4.170141803441634\nneuron\n7.685142498944102\n5.025947032163454\n-6.305349882019506\n7.121820125233372\n2.530668333337074\n-1.990596943236238\nneuron\n0.8090103895433276\n-5.2527609245691025\n-1.9534617246516794\n2.4934145148853304\n-9.549535600482848\nneuron\n2.2951644075190103\n-3.5078602600206787\n-6.115186722401069\n6.615632346455882\n-7.402737579890102\n-6.367253110133682\nneuron\n-4.452882138069829\n-5.075344789657191\n7.704508674707215\n4.302073487167539\n-1.34931882831699\n-3.450940759100223\nneuron\n-0.7619963442187716\n4.258093781916996\n6.724104910849458\n-0.01535435334658608\n0.011980631095820371\nneuron\n0.2805680104647368\n7.918740075642658\n-2.4478973930309267\n7.763942366319125\n6.808966180059411\n4.208159299116603\nneuron\n-1.1158851747524623\n2.157451376105861\n4.393257103875401\n-7.61551029904556\n0.8531358101869801\nneuron\n-3.3897200541983863\n-4.379932974580763\n-6.525702871102393\n-8.005923303609839\n1.8923039572626577\n-4.931277446489415\nneuron\n0.7880497991875335\n1.9092836853334405\n-3.774502951207732\n9.732750366980952\n5.544466482225523\nneuron\n-9.34057432698456\n5.646427451344209\n3.3975604287426298\n-3.822505413822892\n7.794632155985408\n-0.6870793423068067\n9.498345476741948\n4.44252083134927\n-1.7716070305966092\nneuron\n-0.7319617897354358\n0.8078270341571936\n-3.807790335431862\n1.5102143908570698\n1.8336296501907223\n-3.558630917713299\n-4.6192603680125455\n7.150724608203594\n7.179091885755808\nneuron\n7.748987981058095\n6.860860190009294\n-6.760155549058062\n4.191090673969386\n2.2205379489743526\n-7.047868635771772\n2.9757457029966328\n3.7254978987681886\n5.143853737877004\nneuron\n5.225653237981818\n-6.495557314066584\n-6.558724710598294\n2.727625744049156\n-0.06455711761273575\n3.92855907994885\n8.263058893536872\n-3.5927059553920127\n7.369295584678239\nneuron\n-6.238400470631569\n5.4196543920539035\n-8.174618172636006\n9.547357347171001\n7.299179614983324\n6.812941919405404\n-8.811093320615363\n3.495629375063536\n-7.527159263502439\nneuron\n1.825706682549768\n1.6766079964621516\n-6.718770250802082\n9.771744151176627\n1.7722009444704145\n8.936266500843328\n-8.488522466940152\n5.105883547132715\n-9.912403325518945\nneuron\n-1.692873420095522\n-3.614904611690297\n1.2551360093809105\n-7.709887261767832\n9.287206943831762\n-0.9136465614703093\n-0.2570995104307139\n2.597699415567365\n-5.625589977043807\nneuron\n0.627515880849796\n1.085296962090767\n5.630658255704326\n8.867964985517604\n-3.571335807302227\n8.840517231407102\n5.536300036922461\n1.2270729721513174\n4.1584420148654\nneuron\n0.9768140675084402\n7.517274578403848\n0.9141443747331368\n6.55064411949753\n9.044859981862317\n-0.11818988418460519\n-3.1110116046584024\n2.280110151762973\n-3.7405441132865813\nneuron\n5.426309528223423\n9.726550144627122\n-8.737863569698545\n7.994874269577068\n-5.69170394701567\n-8.961016273940485\n-4.634446353543831\n3.6404885062340453\n-6.917335961237074\nneuron\n-9.84936499760188\n-2.3946755565717637\n3.3171945743542253\n7.476405979671725\n6.8141134752803945\n4.455308285248392\n-7.138331158510258\n0.47402107847055674\n-6.119702071009064\nneuron\n-1.535640004578016\n-9.58113153510084\n-5.439857997992887\n9.411185913114466\n1.2556096331615296\n-8.717007387687662\n-3.377239349572385\n9.90879050932205\n1.68717145713418\nneuron\n-5.325386454506107\n-7.197397195887028\n-8.912170322745776\n-5.339458464253362\n9.967106596261956\n-0.32851694815531296\n-1.2578845390805249\n2.6050120814695976\n-2.533943247400321\nneuron\n-2.956707619692893\n-4.2008572551901135\n1.431624026970988\n5.095052061274745\n9.299006598490333\n-7.0445494246707785\n-2.653311955389397\n6.674116439090366\n4.2429131938630205\nneuron\n6.637870739568963\n0.4448060744081217\n-2.671365796143661\n-5.393638739147026\n-6.3877264697869744\n0.12363925029948986\n-3.0354175140228756\n-6.448553811784919\n9.020462976788098\nneuron\n1.8401283938228774\n6.2517194296145835\n-6.290811243448404\n-2.4222945943611096\n-8.35335962186049\n-8.702378267701373\n-8.892005906949233\n3.9710355047942447\n-2.937882059796424\nneuron\n7.68320317371076\n-9.937400576935893\n5.5986632447755795\n2.5698800566094837\n-3.4570132864623537\n2.6041660805154265\n-6.738392641976601\n6.004595165763975\n8.201742646723204\nneuron\n-3.0205769179185515\n-7.87091258303005\n7.658223520562184\n4.398908738759313\n-2.1348987217546744\n0.13972911058977244\n-0.9144929778752142\n-7.188261177324959\n-5.490856278415251\nneuron\n-0.7424389965552392\n-0.23201484773339942\n-4.725985911567834\n1.7730820172059047\n-5.0902027766752855\n-5.087589221017314\n7.065481912456841\n1.5067916915871482\n-6.768846605319865\nneuron\n8.5948028858286\n-6.533333855459544\n-4.655517753447327\n8.965390979035384\n5.699107803140637\n-2.857309572675384\n8.026768934207686\n-1.765804897380634\n-0.6031117145397191\nneuron\n3.5793853051573077\n-7.294769907719503\n-8.371978395078191\n-6.669978252026809\n-5.205735991206055\n9.888571248110562\n-1.7946605539182836\n-2.7367713398831706\n9.01067114517571\nneuron\n7.134048909455018\n6.641017851991018\n-4.322531765710636\n8.767622417477401\n-8.139227378015775\n0.41111277845636174\n-7.726960076724487\n-1.4768634849131268\n7.605708187765378\nneuron\n3.331669825143786\n-4.410207787209675\n-3.062341146905405\n4.478673013050958\n3.6073976326042545\n-8.210873802086082\n-5.931927658001134\n1.2584060616499193\n-6.621014762717974\nneuron\n5.937823920171244\n-1.5459154640539152\n-9.807120408201328\n-8.030630913025256\n8.50952700382651\n9.342417728967636\n3.0249448551474245\n3.6448919778108446\n4.232985727496024\nneuron\n1.3688418893867227\n-1.6780321197402293\n-8.91652888587888\n-8.559322271778667\n2.20485767232679\n7.892342392080753\n6.367533797133886\n-1.4539119832598368\n-2.1070073123803135\nneuron\n-2.981238311650145\n-0.020922625571127007\n2.800979268563615\n-1.2585821635026107\n6.060600561045371\n-4.781661681120717\n-7.858162056870692\n-8.236440344205647\n8.898794793959294\n-9.499495411184853\n-1.3915075897823148\n6.703763430387957\n-9.158089505263893\nneuron\n6.623232969346513\n-7.686703090641784\n6.8979216894527395\n9.149426595361296\n-2.48714319164393\n-8.433618648235123\n-6.290679945265351\n2.7259178767823644\n1.283802782397303\n-9.705963826132297\n9.16217203726003\n-8.800598532345589\n9.738247410118984\n-9.790910770777739\nneuron\n9.007883642986767\n2.5392426813906854\n5.452157799321213\n4.9813913278336415\n-6.668145620899155\n7.473539326749272\n2.9729128011732953\n5.402480035423334\n0.12533283613666457\n3.9954479054657432\n9.799469572770265\n8.976888306016889\n-7.187410811887052\nneuron\n9.336991314186536\n6.530295233130858\n-8.428732190868782\n-5.783295162706397\n6.781548329306544\n-4.270230140948758\n-3.94106351378406\n-7.746191112349237\n-2.325942785442634\n3.6527650879123663\n-1.1905790652301351\n6.33729287161594\n4.611699223722883\n-0.7232224118668729\nneuron\n5.270448714419908\n-9.779526679569972\n6.783022785141295\n2.401811785673913\n9.62111008320698\n-3.690761876452844\n7.231030129980976\n6.974342858700364\n4.1499045454774635\n-3.441453101836145\n5.746183169324484\n-2.508143739749895\n-4.91471356875773\n-9.902190010801334\nneuron\n-7.086595086556353\n-0.9963507404609673\n0.4828985586390644\n-8.036824567817613\n9.309447923952138\n1.8231024995574918\n2.5738397913138122\n0.5658590517754614\n4.048360225332481\n9.315444051101252\n-3.906319251379713\n-6.196546072068823\n4.331147098050816\nneuron\n-7.631006177582451\n6.650387570753051\n-4.100590518588334\n-0.49678075542773037\n-3.3886335736760276\n0.6243175774935272\n2.920401761993847\n-4.444920315703751\n4.359571424270006\n7.841632338353501\n-3.957044143286834\n1.9893207376648725\n0.40188975690119033\n-9.013657449313143\nneuron\n-4.214619544756535\n-7.985381410976271\n-0.8046343361943764\n5.718913596144337\n-5.713665904787901\n-1.4469420289583979\n8.02773196571627\n6.2296280316364765\n7.786570047303442\n5.162169887805961\n1.862836214072976\n-3.867432918605409\n-0.15998684988415057\nneuron\n-7.3534794200974645\n-8.897567496866937\n-6.283404244546372\n-3.287559233891013\n0.34417997788116494\n8.596784666183915\n-1.6723552060498714\n1.4736066817382953\n5.617788776299353\n-5.769533915989946\n-3.8905544166123063\n-5.101042098573481\n-9.593714788084531\nneuron\n-0.8682626422530615\n6.561391360934998\n-1.0156306480421007\n2.2160675877022573\n6.920542319251545\n-7.626609918779456\n-2.7975711411147075\n7.772216346935659\n7.7104877952266655\n-5.947712638996543\n-5.06327912373817\n-7.024252854644919\n7.1478933922568615\n-7.099941954522004\nneuron\n1.4020499404598397\n-8.0741556499162\n-4.554780275293398\n-7.2229427974930545\n8.2221676198286\n-5.180303540613076\n-2.426858769827287\n4.733454239791999\n8.210135587352623\n9.178653610854173\n-6.088694292584506\n5.952392259923971\n-7.434523536903603\nneuron\n-3.2564897057986952\n8.52693092901006\n5.7475247033767936\n-2.2509164007569926\n-7.243162304634236\n6.482531027977442\n5.902329268154229\n2.0107686782874623\n1.2505813504216623\n-7.661608506741288\n-1.628132745950508\n-7.466207454696323\n3.8339482901902833\n9.758037097463202\nneuron\n4.391419229648433\n-9.004950359598071\n-0.46015818414387066\n-7.422040364101534\n-4.203999597367418\n-4.264879193004223\n-6.861319774840828\n4.788061700546007\n-7.4595230479158525\n8.009384078653177\n-5.902182613893341\n9.538004665696977\n4.985172635403221\n2.012257602968479\nneuron\n1.1960968227743818\n1.6033770358641308\n8.531932072686086\n3.027414845239964\n-4.332175411881291\n-3.2527893657921347\n-6.760377250219401\n-2.2901761948631982\n5.079522699145325\n-9.722104353374375\n-1.4837008916315186\n-3.640699225180395\n2.8709295707325544\nneuron\n-9.968082422889896\n5.951602009075591\n-4.943059171226476\n1.936834629742803\n4.396377972417838\n0.6356510187270215\n-9.863885102252567\n-9.547725399482141\n1.8015707917807444\n-0.5649204493008031\n4.464621006708025\n-1.8946807609380811\n-9.025013003658355\n-6.595641199950755\nneuron\n8.798045592435276\n-3.9990553282246366\n-7.412332915117982\n8.748291063285246\n7.484234417331363\n-0.11902305981777772\n3.9697068250803125\n-2.997024068529115\n5.576033273494298\n4.411045337456924\n-3.65604554185466\n-2.9325988107197776\n-4.16257386789745\nneuron\n-5.041224139054725\n2.1482128627146735\n-6.8280349591555805\n-3.0304921775343896\n-0.23803752559098612\n-8.986146125413022\n8.165957467233643\n5.26641720227659\n9.087384044676543\n9.272834700167001\n6.935995633265168\n5.889684882615047\n8.45875346564883\n4.319932098285227\n-2.324542775635403\n6.650522979154889\n-7.673210539143966\n5.207069528843591\n5.51042352651794\nneuron\n-7.552473650306732\n5.079812799813301\n5.275268699383549\n7.518022374018667\n-8.235890225606383\n2.77254997620787\n1.0776392379694544\n-7.150462082876579\n4.498088561074303\n-6.099076955812319\n1.3583035117574815\n-8.812013463640035\n-3.932071986326209\n1.2912283798963897\n1.8364487345223601\n3.3153692525019673\n-5.2409468541803506\n2.7590414808996844\n-4.726706085864498\nneuron\n-6.1042807369101055\n3.581066617843147\n6.703423787353677\n-0.6413067138585093\n-8.248992257637038\n1.5583332625029844\n3.044934518674889\n-6.3700700615624894\n5.09327328130504\n-5.963820750516575\n-1.0784667801596037\n-1.3553780679656469\n-4.258876195534693\n6.724260458428177\n-6.641234994389206\n-6.860936995267086\n9.169175975715582\n5.989198863675345\n9.017649214457055\nneuron\n-2.7296912053864864\n-6.585926971315105\n-4.666725767984827\n4.378575258135964\n-2.3607690766323497\n-6.827425202398347\n9.347317882989808\n7.194434717374256\n-7.942269484263232\n-3.0968742912977065\n-4.739342804290175\n7.9977748035597624\n-1.4183947939974617\n9.008823877955873\n-6.23789980585155\n-8.09320824438738\n-3.9075552489677445\n1.7907733892678146\n-1.2361953669994064\nneuron\n-5.941674148211216\n-3.376510506620416\n0.8161963966973396\n3.423482248052774\n-4.121181670371312\n7.958030177669368\n-0.8173271502502955\n-1.033373820193857\n3.4287314024146642\n3.2490683182757496\n-7.064213292177406\n-7.405749881779817\n2.6614276206615584\n0.1143979619754587\n7.2629881416766455\n-2.3355001795814356\n-7.562398527952434\n-5.739029569275851\n-3.567094078181763\nneuron\n-7.043514738508943\n2.1278284882430043\n-1.937228895256231\n-3.063253974481288\n-9.260402405218294\n6.675127825972651\n-9.625810626378522\n7.865136297974398\n4.825423731287741\n-7.342024915538438\n6.666746082252364\n-8.97473812528678\n2.975348787248109\n-1.7557566371507605\n3.6032152691043784\n-7.119077095360764\n7.876380053937888\n-4.25421652298013\n8.417775258933682\nneuron\n3.769511141219386\n-3.2848011508267283\n4.43978515742951\n3.7855936601715734\n-5.589283619172345\n1.1380569916216454\n-7.458693095188718\n-1.4001624040211103\n-0.893339206289927\n-2.475360250071841\n4.640196591534382\n8.376424126367205\n0.6154137778138247\n7.333394525628362\n8.101603354828837\n3.0884249818713627\n-6.845688386232323\n4.297314602918306\n6.465854984895145\nneuron\n3.5848449216544487\n-8.69275230605359\n-9.988777419215078\n-9.410309256869969\n-7.7784262813226075\n-1.6716140219837161\n6.735346989621187\n-0.00980596184166016\n2.6673765531777294\n-3.2263629036412245\n3.481436870753718\n5.592565699067309\n0.6268882222285121\n-6.1854321286752505\n4.852646131886229\n-8.40159513388574\n-3.96774975900938\n7.513506866601835\n-0.11083489605882679\nneuron\n4.979535320569357\n1.5114272192642542\n-7.470692590246686\n1.3832783869897214\n-5.27771215474941\n6.696611964919111\n5.704574963066018\n-2.1812376180461346\n-1.4880481272490176\n5.400320694492489\n-4.031838227408526\n0.5923049453792939\n9.295271057159102\n9.245599415161351\n0.06715544882121671\n1.335232089808005\n-9.918552478451858\n-7.255767718069615\n6.913104287850524\nneuron\n-5.9335021675808015\n4.899127544973753\n0.5167709116642172\n4.5010243965973284\n-0.3008372758716593\n4.831543325242203\n-9.356074853013684\n-3.6071845292906235\n3.498463039963544\n-6.1597671361236355\n-8.347963702579673\n-8.28698131260274\n0.12426072425924639\n6.481158851576286\n-9.54295214816465\n4.590933475188108\n-2.5067961786813076\n-3.432446262267379\n7.3825149697832\n5.75368178763356\n-8.521533691844365\n8.0671693096579\n0.6559367605728794\n-9.080855265899983\n0.21173170869166702\nneuron\n-5.298083694762912\n-3.779092749119193\n-3.519493082121865\n-7.15705898348866\n-9.567779088830289\n9.439084261670521\n-2.4814782850143446\n5.017969181703965\n7.284837011155874\n5.105151147774434\n0.11512556411010344\n-9.65092502461534\n4.467896194414642\n-4.79220160431294\n4.108452057489192\n-9.103263168211592\n-3.8982278646075774\n-5.547832265582013\n0.6556433288690977\n8.996059108279159\n-3.4271439527033576\n9.876546238871045\n9.758368013864473\n1.080608727879817\n0.10390582931310233\n9.31824473447785\nneuron\n-0.9188927202414376\n-4.72329297955552\n-9.424414635904943\n6.174759889102573\n3.192097539040597\n-6.3948190410468975\n4.332660733321065\n-2.735602739127052\n-1.5515656502857955\n6.721228708001387\n-0.35129972299642764\n7.084369105476176\n6.418534724829373\n9.145180052840649\n8.39207590071849\n4.854372347656168\n4.7103380716595655\n-3.2703309044797413\n2.758086968598701\n-2.234566809097265\n7.344506283365737\n3.9477342818949213\n-0.048108472459023055\n-1.2917752660821025\n-7.750015174718328\n5.926832645227924\nneuron\n-0.3873449505132798\n6.077160730296032\n-0.2563910241588929\n-5.4963820594223805\n-4.673352692187896\n3.656941391228634\n-8.181567022850878\n2.508569927245108\n-8.879290546867303\n-6.387848476942506\n1.2948627666797674\n-5.385706711329055\n8.79551321958112\n5.888648206096178\n-3.068427528516362\n2.0443241993434236\n-4.546206862988953\n5.955476752786737\n-8.127735219147429\n-2.4339376293323234\n5.706600599879705\n5.2725926312100535\n-0.5456291705607863\n0.8600967490543265\n7.541110508516786\nneuron\n-0.7790364367791502\n3.820231138040624\n3.7027061505209358\n2.42055898509403\n-9.190546977097947\n-9.777873595998038\n-8.964257634710473\n-9.525709886705576\n-5.492668741719053\n8.905164137184222\n-7.2216352156961765\n-3.2386681210369317\n-3.3013394410012675\n6.405771458531138\n9.764163435491922\n-0.9381493848430966\n0.07186673591903281\n-8.676857025868118\n6.369689288201894\n2.877703614455458\n-8.874076429609248\n-7.655161499502596\n-1.0264298026039476\n-0.27140814987516304\n-7.227740318873323\n-1.0926127650355788\n3.9724797172149384\n3.726627301708183\n-8.765101245160684\n5.366166061861415\n5.637019468062068\n-7.182205369960264\n2.54560719803524\nlayer\nneuron\n6.989468175362483\n7.284260879136253\n-8.325901958090551\n7.892107438164446\n-4.329103298363939\n-9.667863913898628\n8.430107198898433\n5.011030459879089\n7.526898959663166\n0.15831962463997762\n7.700339320002067\n-4.698182727208778\n3.331733094681202\n-6.292808818459948\n-0.5578304074698703\n7.022763717607912\n4.319531525681164\n4.509883886222285\n-8.13952415355605\n4.374917408874954\n1.5812836889533566\n-2.485647009498233\n-0.9297768928265637\n-7.240611633889598\n9.830233009366662\n-2.3349821445351493\n8.01089467037288\n4.687768350350376\n-4.987573652734714\n1.0482619064824283\n5.950375795311702\n6.321088139733035\n3.398185499211177\n-7.816509546283028\n9.455231129381033\n2.0540671739188854\n-4.013953912612058\n-7.563996373739634\n-5.887111876898976\n9.858802863684893\n2.252420935132904\n-4.489537214139181\n-1.9037969046813763\n6.202603641269519\n9.026100565190706\n-7.504643848502084\n6.258598837999562\n8.055026186797093\n7.492776833336996\n-5.64883058565785\n6.161634664125577\n5.641455647616034\n6.412550947620583\n-9.178653619783383\n4.098762234439672\n-6.883684023535796\n3.2066181995836085\n-6.724466379112492\n-1.3905166128020219\n4.748677560886105\n8.083873843812963\n-3.6036451115493118\n1.6032717597156343\n7.392671315981034\n9.174626456752872\n2.77446526180396\n2.501580202731082\n-6.569075967489475\n4.91252595734017\n6.676375148837222\n-9.157266394345712\n1.920995489927626\n7.023104394417919\n-2.921513316577662\n4.276482120082747\n-7.739945798463735\n-4.948092715332361\n-5.64862545207829\n-0.2944451813755533\n-1.9759469618384151\n7.776099421481968\n1.6612775104226674\n-8.371376375379512\n9.500093266079483\n2.2810663382397567\n8.122904280785352\n4.0133372991168415\n1.5411711891044444\n-7.460259436462624\n-4.305749842017086\n-7.141029238280641\n5.768574142209917\nneuron\n-8.522214746160133\n9.759237595603267\n6.746693135841484\n-1.272273027689692\n4.303941330946115\n-2.124085027612539\n-0.5883386133286983\n0.007031197662747957\n0.7469630012685058\n-7.935376115723258\n4.103805663682323\n8.352548888105174\n-9.50928532656722\n-8.223060125576588\n-3.266604391778092\n8.99224409318391\n-6.923030107407238\n5.248507885607583\n0.9926070074052418\n-5.348306388023472\n-2.3955030263974586\n1.9951046689397756\n-3.274495975199152\n2.4739958720128263\n-4.096993594635128\n2.3678997893846354\n0.18100540074779792\n8.107808061364022\n-8.709201557977535\n-9.446637592715557\n4.299974654645142\n-7.996105941570672\n-3.6833078759842697\n9.086823368001033\n-2.22997426841012\n4.0601082982006576\n0.5012897910134129\n2.1855172622550745\n-9.107785473750914\n-0.3357713734387202\n5.995532710189552\n8.060705891308487\n-9.590004007326465\n-4.6346925379813575\n5.713714186822971\n9.326893943400293\n1.8231621279126298\n0.5062012941401028\n-6.003452656553927\n-3.9273258683508527\n-3.242508599521623\n3.111141551286032\n5.040578077437797\n0.8291588920072668\n7.452599318813624\n9.553105332485954\n-4.386405795044017\n-5.827186441572801\n-2.3479235713635305\n-3.0823365374894784\n9.861832989179902\n3.5776017522955783\n3.974016833922558\n9.122946713842843\n-4.484224339691753\n3.6845401826558355\n-0.03411968607649696\n0.041477069620228235\n1.172976431440318\n7.131338680861045\n-6.074046278510976\n1.684432565200551\n1.1709421280929133\n3.6940829882298476\n-4.979304326987086\n4.818115146921502\n1.3863559177281282\n3.940345335419455\n9.298681941595117\n-2.1689200872035452\n6.711032053831351\n2.5913790963746353\n-8.306384474445561\n8.40101468115005\n-7.166966074396606\n-5.01055725682964\n-5.871508472632088\n8.044255455916584\n4.067712656590643\n9.36590439625935\n-1.6117962103061134\n4.650055597765029\nneuron\n-8.812145610538359\n9.474451305706019\n7.092997592494625\n-9.062344461754467\n-1.9403964194445122\n2.0282710005976567\n-9.975969770969506\n7.433654003730988\n1.122613319567567\n7.15334485086651\n6.099846591660678\n5.3975304727525675\n-3.353087073780092\n-6.286153386692233\n-2.3881408266428505\n-5.044963703927086\n-7.779240031457757\n-4.368974237225586\n9.944901112912412\n6.927548631375076\n4.853524662631019\n-5.293406811064858\n7.265884432085423\n4.508012633361094\n-7.144985027585036\n1.1866428139258822\n-9.927040270505325\n-2.3134959851289283\n1.3064788980899444\n2.1175248074957254\n2.8108174803989616\n6.814680964636722\n1.1508669688147766\n9.096982782863105\n-8.490059890109766\n6.068500212110417\n-0.49351877945942313\n1.1960400037079966\n7.506736355652535\n4.343390351531784\n1.8799432398532656\n1.6106987494812697\n-3.171538095186568\n-7.92008728190064\n3.2423384514318543\n-6.783557011571806\n4.2046753604703895\n1.1472169109051467\n1.1227125846240993\n-4.460653132933019\n-0.041919013214746226\n8.796136290810272\n-7.43839497102285\n-6.726111999103443\n7.87460084227831\n-1.0175833753359487\n6.080123666394925\n-3.77223070121524\n-7.791190180988603\n-4.7638860397850635\n3.720450326375462\n-3.0345708336868027\n4.098889576293081\n-4.784298101644584\n3.9636518502191187\n-0.6465940940874026\n5.888980407241034\n4.735176573695236\n-3.871728709823099\n-4.269696342026432\n3.803312070400573\n3.7463805994685417\n-5.360986320960841\n2.1483947745490917\n3.858257102412199\n-9.613444070915897\n0.39773159514171263\n8.568661770341883\n-4.210150739877639\n5.090081587081974\n9.415432910508788\n8.855534000344768\n-3.6128282070818973\n9.3214923158831\n8.210514978087618\n-9.989965209820767\n-4.6239487071350105\n1.6819751508446656\n9.495761975405097\n4.004321147094398\n-3.6562667829706474\n7.364417945393649\nneuron\n5.950173790811075\n-7.846413696774848\n9.654163602865358\n9.147312467711533\n-2.9518515739527396\n3.220373549372264\n0.7493445292032042\n1.3038553395665575\n-3.225502615457745\n8.707024470752497\n1.0627835031725241\n-7.608232184208841\n-7.850517399171622\n4.324081993176754\n0.7055279029150441\n7.6224208719440245\n-2.337030271301035\n-7.846589058593494\n5.366269519846394\n-2.5423119971091213\n1.6099765409812195\n8.178392278231836\n5.388670917172416\n-1.5831022596489164\n-4.7749356678358\n4.282448121706011\n6.992674305366724\n3.258792833810893\n0.014167034185916805\n-2.8588456528599404\n9.837509886186453\n2.7803577897739595\n-7.3950494797617345\n0.31877023912100233\n1.8005867982584745\n-4.313398316031973\n4.402334732292155\n-8.153998254565554\n-0.5599343072566643\n-2.942610666283356\n8.920833120428524\n9.655759184346294\n-2.880622928621308\n-0.2929027360826053\n1.5622518598647406\n2.4719457744108464\n-4.457262368995618\n6.293706311678136\n-2.8404280739834786\n5.347092099348927\n0.08096433043463191\n4.78740798866429\n-9.254673269376353\n3.8832984636490497\n4.622137658434737\n0.9551285366098661\n8.64498992991933\n-9.105947273612212\n3.9311806850382514\n-0.8313797799882838\n0.9290469013697433\n2.2031930563361524\n-9.404588892578316\n4.168240138095236\n7.654290039325932\n-7.806307560359165\n-2.9954900608103063\n-5.873829156233179\n-9.539084156122952\n0.07437721823284171\n-2.824990105263485\n4.90152220087915\n-1.297977629814111\n-6.442925238315613\n-7.441000827516191\n-7.478181378487577\n2.8403781616853174\n8.806320381849794\n-4.668404492565785\n5.976092881175196\n-9.90851385301615\n-7.043891387757057\n-7.246495387885615\n-1.9578996027896145\n7.28626283423313\n-8.310307865592872\n-5.416983951598673\n-2.714535626944401\n-4.552835519592657\n9.790523437678473\n-4.306385469920231\n5.872377710504191\nneuron\n-7.9374712157769745\n3.897081198612611\n-7.01518532835689\n-7.5395592581667366\n-5.37903632568484\n3.264799740520554\n9.713698122672326\n-2.8860305415230503\n4.0979904876432105\n6.069370105247387\n-8.436909801739647\n-5.840358843269627\n-5.546072284671839\n-5.161114054024278\n5.811991619018524\n1.2282825521629848\n-6.65987205925521\n3.405319500050734\n-2.8769427022274052\n-7.2965862335126435\n4.603409215065788\n-0.2004740023264051\n4.736353245022875\n9.148158879874398\n3.1438212948036703\n-6.311573518711393\n0.8274344727678073\n1.7831298498401371\n3.61887324131577\n7.723634203313634\n-1.5354672904643851\n9.803118509786795\n-6.997057796623157\n-2.977841994007977\n-1.6867033380599228\n1.7716985761772874\n-0.7007581871351709\n-9.171311197757404\n-1.9615279697858679\n-1.2519635690023478\n-1.5224365724410838\n-5.947552526501115\n-6.707084171492761\n8.233156150533587\n-7.341511881647844\n4.6500962517762385\n5.126847731344886\n1.5207974717160266\n-1.1483109650392809\n9.633928688914228\n-1.3967476821990954\n2.8418886963000856\n-0.8994906826463911\n-6.478853868691086\n6.742684278403594\n8.293461996423616\n6.121612285518974\n-2.9496007985770434\n3.215496185651685\n-4.793422817918744\n-1.2223340072617606\n8.405301026668878\n6.751468721287727\n3.555617730067142\n8.233386784294803\n-8.040349566714994\n-1.1240088891881261\n-7.717715427550614\n-9.667006164579188\n-8.678497794163944\n3.3557502148846474\n0.482737476968087\n6.49513566784192\n-5.709058311807434\n-2.6999029282097964\n-8.407026424570443\n8.920488624693839\n-3.9230751510286943\n-6.903836139128446\n-3.844250225124366\n-6.285537810407888\n9.490469609741087\n-1.0329011338686422\n4.1598616304208775\n-8.580934202588182\n-1.782025637725655\n0.8240175118712978\n5.482150086412809\n-4.794905187278575\n-0.5682459372350013\n0.27360789198037194\n2.52217404391637\nneuron\n-2.1709441813615604\n6.296733869483317\n7.800728651486535\n-8.603826618276845\n-5.892721282303041\n-4.640882212423083\n7.55981010274181\n-6.3682149647982245\n3.370570842791867\n0.41721215425846614\n-0.8950834626181159\n5.944674854720526\n-7.524962578296057\n3.2786635937083886\n8.614296136605832\n-5.9755054625879245\n4.92492418177094\n2.6624372181234834\n5.617654709548308\n8.540522113046105\n-1.7356010909670405\n-6.227816819067784\n1.5159062565615744\n9.158951554065489\n7.0451368064997455\n1.250491780251921\n6.551877558345238\n-1.8586547965911437\n-9.880795224599302\n-5.139412086140245\n-9.899215958552992\n5.386350365714607\n3.9491740708782963\n-7.410539885794291\n-7.325191262379782\n-5.380478704301921\n-1.8469321020813734\n-6.484953341159844\n2.1634210267587406\n9.564634575697866\n2.7852494043790177\n6.302770259324917\n4.251650454977989\n0.31003247895362795\n1.2877378471569534\n1.2492778864233833\n-9.711593521079472\n-3.5538603361745125\n6.063552766900111\n8.901337649389646\n-7.163624404430591\n-4.886668556024311\n-0.9716439413781197\n-7.26663954941521\n6.64395279583977\n-9.234373109848018\n7.337888914302266\n0.47299379285143717\n-7.992092120024266\n7.410061348714865\n-8.932816496301877\n-0.6885782200280555\n-8.425314408839979\n-1.795801404953563\n-2.0714926122150246\n-2.4753991853014368\n2.9113391301401936\n7.442683427011443\n4.1277553454000815\n0.9211592417062686\n3.756632326174383\n5.583281184929067\n-3.56723509647338\n2.34234486541387\n1.6465979908813133\n1.6635245671282517\n-4.018488814686039\n7.099766647157466\n9.539316922071723\n-2.9789873416152757\n9.365647878076464\n6.0132103827915735\n6.35446398910209\n3.8022235284637773\n-8.512273809293484\n-1.8630293061114278\n-5.788644822071314\n8.976614390534547\n1.9403441859270987\n6.812913520598045\n-0.17374887480049006\n4.90553106704172\nneuron\n-0.08143150072178473\n-5.693342086727071\n8.307827633441399\n-9.859943065860568\n-2.135070512371877\n8.084928957902475\n-4.37163307885913\n0.715309435674325\n-7.51715087528511\n-7.343178485228828\n-9.598197074388706\n8.84729831959862\n4.369696574353816\n1.7600807882629965\n7.015254314855293\n-0.6564927129112741\n-2.8628605068641155\n3.2717816261236843\n9.541793049789586\n-0.3227703859663378\n9.645425019871073\n-7.509160119709621\n5.795069996247834\n1.6625391591509997\n5.52883631648143\n2.2795441192720456\n-3.4730747314212396\n3.044295897098399\n-6.017325228971055\n-5.229960368863466\n-0.423771715425183\n-4.0776713879901365\n-9.164836337704923\n-4.995538294801372\n-7.186070220172748\n-1.258006547540702\n-1.239312802743191\n1.119504535306699\n4.647121286577787\n5.252567950532034\n4.132086535538777\n-8.417919498603242\n9.89183880589794\n5.605692119543068\n8.337246400470486\n-7.836795848519504\n-3.9571469320254327\n3.494358996148015\n2.4708915832258715\n-3.3630782535233306\n0.4001085510627056\n-4.40248215284724\n9.608935865702904\n9.3777061281729\n8.145651163680041\n-4.33421162863465\n-2.3171446077336033\n8.642377580765267\n-8.64835266137262\n-2.5187079059099293\n-5.444154163271378\n-8.137699233252034\n-4.820141792379551\n-2.247975395360855\n0.30886958584475765\n-5.976636639174182\n-4.977922999949625\n-2.200553423075975\n2.5261100178735285\n-8.333327349110132\n-8.681006758654298\n1.4434318770407306\n-6.443282753474804\n-3.837886760195577\n4.242557565366852\n6.822257898055499\n-6.324354279925021\n3.197071747633342\n-3.668310977756515\n2.4715654734935555\n4.184645101782487\n3.609589437641356\n3.1659812292984912\n4.442259294342561\n0.8998505841110083\n2.1647279119968355\n-4.253098567814016\n-2.4955901015154303\n-8.83794429916108\n8.45595332814491\n4.17854890071747\n-8.82798229425116\nneuron\n9.72673189738133\n-8.77614673927244\n4.355788067353059\n5.731076316951434\n4.69925879705322\n4.5748774645616885\n9.92641229346014\n-6.874871618548967\n4.669549133160191\n-2.8422885140985588\n-0.7565645935021492\n-7.169863604733222\n-8.854530190691497\n-9.182204605654412\n-2.518323465104302\n-8.820962362718864\n-6.397140955947416\n3.547203737147755\n1.609020444590421\n-3.0072640280622176\n3.8380863741779625\n-4.6035952096727994\n2.674342286040736\n0.6452985363507491\n-6.653483165406373\n-3.012879935189501\n-9.363060713490299\n-1.1319242809767815\n1.6815208661983982\n-3.2413021549518906\n-7.879660192004079\n7.825782634693845\n-1.6684517139687638\n2.007520381855785\n2.986556554376567\n8.769561959439914\n-3.317578212923944\n8.620208218440945\n4.331230263438258\n5.913309571433773\n-6.921407051839481\n-7.037080403821145\n2.906255075617563\n6.051420212030054\n5.004662419449506\n-5.5314755084969995\n0.260705765676883\n-4.444526404214186\n0.9471535356569638\n-9.553792246610286\n7.759267945063679\n-6.046637986090189\n-2.931670739210732\n-0.5611760255657128\n8.232573628303332\n-2.2716592895264243\n0.08471199868953283\n7.306367115694117\n-2.329868609877841\n-7.914955571712219\n6.524414282225086\n4.811285047570646\n3.3042384457931795\n-8.34365197022867\n5.551384412300859\n6.330913189729664\n-2.391737117300461\n-5.6612429608178445\n5.727671692332182\n-7.772095449437943\n0.49604464635853995\n-8.068060361091135\n-8.461980794509374\n1.2074725143577991\n1.228225540724428\n9.682184855097384\n-7.556333721371178\n7.256032517456101\n-5.542707978700847\n8.90311103083635\n7.765543727968664\n8.276678402970587\n-7.297868407774533\n-6.6400478344741725\n-1.507933864065425\n-3.744964647105873\n-8.120161890184649\n-6.650849889674577\n0.49314457587696703\n-0.5724222937627843\n8.870990608716703\n-7.294313428033181\nneuron\n9.081241417780184\n-2.8238087731829165\n-3.0961092185824945\n2.5278439647365425\n3.6892285455034313\n7.7902648156234715\n4.671200212337947\n-9.176624819018235\n-0.8230063953310252\n5.480403203316822\n-3.962442260144168\n-4.17057664394312\n-8.051888414355549\n-9.000928937619054\n-5.527892580542777\n-4.681095421352541\n-2.105251229580396\n3.882764626839743\n8.688776656999133\n9.285875483463995\n-7.064658799969452\n7.026159395474494\n0.4211150159234678\n1.1269736660941532\n-6.2467781546333185\n0.5924691341786037\n5.966029660507816\n-5.622734294739233\n3.5541585180726853\n7.769149043698816\n1.1061950763665274\n-4.568049829260308\n-3.729925020168414\n2.898824132844271\n-7.851061968935578\n-8.442258219885606\n-3.7421786488990927\n-5.192674083321059\n3.1537100634771065\n-7.459724279781086\n-6.608804258569743\n-7.521472499170258\n8.330142075545142\n-6.738050780371141\n8.25732583176255\n-5.334440925366075\n-1.881314726372345\n8.832061446824271\n-2.160924731088578\n8.118506358570928\n3.796963593291647\n-4.947393169299874\n9.703734902124578\n-4.365427819830923\n2.9886179645304045\n-2.753479228311304\n2.0806185215194617\n-8.2869502056358\n0.2855191308919425\n5.768442713586673\n7.765346455769904\n9.42099998076576\n-5.677027673263558\n7.795064972812322\n-5.797377127932062\n6.848634854441129\n-0.37621679740491576\n-7.2688668579943805\n7.452386494387175\n-2.9354386118561027\n-9.501334606504763\n6.335774008671489\n-7.525693440239591\n0.8706976523747345\n-4.924457076564099\n-8.469511004954505\n-5.784261293525084\n8.790493039162135\n-9.446558440253463\n-7.065045701428856\n-1.1803240102268875\n-2.114195604794471\n-0.557809744163762\n-2.8007106966735407\n-1.680512469555897\n-2.4768612988606176\n1.5965733907442448\n-8.08469111834092\n-7.072824441923644\n9.301229786854215\n-3.7368518115420613\n9.967514045175573\nneuron\n2.123419819515606\n-4.965217325947084\n0.3580898671069832\n-5.037718238486253\n-1.3305782982100856\n-5.542593668134126\n-6.1198628449098535\n0.21545925483242856\n-5.76588823571795\n9.361210368783773\n-5.4868360030069185\n8.57497972142961\n0.005812141761769585\n-8.11848950658673\n-3.331057555379635\n-8.162033851811676\n9.626229611086481\n-5.4170204703712255\n5.551561782040033\n-0.5326655053632412\n-5.9510500834752245\n2.8510333405441024\n-1.7775913273469435\n9.561260532515574\n-1.122169857538109\n-9.03577905586748\n9.890933125936163\n-4.266776617544776\n4.833938015450023\n7.649139189435066\n8.708219149119579\n6.609552302377031\n-1.02758012893988\n0.44963247152316255\n7.8135149120524305\n-4.403264740353377\n7.944402192812962\n-7.359947980864112\n-9.650011202753038\n5.756964925520814\n-1.3508063748467292\n3.316724599998926\n5.629812229305311\n8.855652753056479\n-0.8474268354740122\n2.4901392912873033\n-1.8147518462971912\n1.9399614032980939\n4.39754649927854\n-8.855416938733608\n2.397898791867834\n6.806835565629202\n-8.60790025077355\n8.389495657290336\n-6.318437609410852\n-8.996238220375513\n-0.8840594183562778\n-0.26425953111719913\n-2.1409254683486556\n7.110858589605613\n-9.021746795738226\n-9.783508952818265\n-0.7838073588054484\n7.870537449068308\n4.0864838702873545\n6.947612796536284\n-9.149203488554104\n-6.9464868429215665\n0.5593293610573369\n2.701103065913002\n8.509479975811686\n2.2126568288206006\n2.0432804128660065\n1.9444302799126856\n0.7286051905678814\n-4.122332617758486\n-5.25097526870341\n3.0764803827143505\n5.379328412329169\n7.570427911183392\n5.370083458537527\n7.296152939265661\n1.36778483894346\n-7.724051134770386\n-2.6547736686666235\n4.562159587894343\n8.719263319769384\n-5.484927773323445\n-9.635184999860659\n-7.711000189875539\n4.923447522509596\n-7.928877004837156\nneuron\n-5.426014067119742\n4.4425229859193465\n-1.0145233596645586\n-3.4368866143136145\n-7.350149438890849\n-0.0091798047365943\n-6.701363804389482\n-4.6271601936718065\n-0.21300453851097245\n-4.3506538269869965\n5.500205756330592\n-6.669841316494701\n8.025382059080687\n4.733656352918665\n0.3317913544633222\n7.621244097498745\n-5.276153609011343\n5.025555271057536\n9.827140354505579\n-5.011105503325788\n8.871625270349412\n-5.673340826386893\n-0.21713807749592418\n3.5418273806372946\n-9.276871819228262\n-2.6367003076687845\n-6.8680170629895265\n-4.800355351192305\n-6.609905613775851\n-6.398547587180254\n-5.651378481178595\n-2.4019833617163955\n6.529817829039679\n-1.7408983701846648\n8.781198750799842\n7.682005186229144\n4.283380747050063\n8.718319028780328\n2.287097200862027\n-4.9036076862688605\n4.923536474050778\n9.665924280063736\n-5.287691208533576\n5.096942101866846\n-5.115451067287127\n5.154146003235218\n8.600196024491325\n7.5347845555688275\n3.127396908245601\n-0.8981539858549659\n-8.128427820864045\n7.8995698097348495\n-0.8583215239596909\n-9.207587380007535\n-8.695018149417198\n0.3829971673314292\n-9.503735402885571\n-4.893259896452804\n5.275124160902305\n6.11274666814603\n0.5355325153764867\n-7.135492475654117\n-3.3583121169740804\n5.753238535352141\n-8.07093828085604\n-2.168574182781784\n6.286474445139749\n-7.478966664315432\n2.4300816099128153\n-7.863679287813832\n-7.7374014848069494\n4.789479840702898\n2.0450601798249846\n1.8434127331070393\n8.016285054276038\n-1.0506063263466858\n-1.0470180793039763\n2.1583246148796986\n0.5535560222264801\n8.33857611572414\n4.29742681605034\n9.573182282630823\n2.8575884479022218\n-2.5114953312785415\n-4.662302469248376\n-5.887916990852286\n-5.635914373854964\n-4.623838760511811\n-5.312412125390353\n-6.793709387831292\n-2.6767263170340017\n-1.8063987199785747\nneuron\n-1.8499006338006851\n-8.960030229591489\n2.044914559976174\n8.768931663142268\n-9.11874259097903\n-3.7279183298691376\n9.388962078979247\n-7.846320699295974\n4.6960934538275385\n6.854894233944055\n-5.7425108505916285\n-1.3332905815205986\n-0.3544431092912692\n9.290153831838492\n-7.826875535713505\n9.614153484395853\n-1.4256326954933907\n5.201186607094252\n-1.1552491538697418\n8.034058496012548\n3.567927811627789\n-2.888432857029366\n7.479995642770221\n3.270698784611492\n3.593324650753582\n-4.61613576744371\n2.25468189351699\n-8.719720139948219\n-5.553611852104345\n-5.388911503161116\n9.6823960945132\n-3.820672128107254\n5.8918613713063035\n0.33738315508008654\n-0.05931779592682096\n-7.582369948878318\n-4.447655148021696\n-8.9182827150165\n-4.1068519434705735\n-6.623217698711388\n4.523457097785597\n-3.259623715419424\n-7.790640860950669\n-3.3336554599483925\n-7.261416187833445\n-9.550531048389146\n-2.1785789592850824\n-1.9124487082509334\n-5.491838329325929\n-0.9132615691528589\n1.5312615239347593\n-2.845560567024299\n2.8591145618413982\n6.450665406030989\n-7.537151774105519\n9.354438495196291\n-9.41035844272838\n-3.0682164899678255\n-0.2732573050963816\n2.9787469217169504\n-1.7966016830481335\n0.7074346835251166\n-1.9286188504863433\n6.748138192266215\n3.2158609694173657\n-5.8184905291650235\n-2.397764820695454\n-2.133448757247831\n-3.7304233627514516\n2.960705261466876\n3.429454840324344\n1.1454339300194905\n-4.590256354992865\n1.963332322536837\n9.168108998623248\n-5.904688524342097\n-8.249498092543055\n8.499045267863536\n-5.7091484933402326\n-2.6367281282980404\n-9.06542901848552\n0.9011488925250233\n-6.669440822366153\n-4.558403359081121\n2.7686421096483715\n-1.6426235378170828\n2.5281803122737223\n8.853659269960826\n4.694226233983725\n9.657592775417044\n-4.36361617245476\n3.2761740606098155\nneuron\n-3.3226634406837885\n6.614749663379911\n4.967473490356298\n0.0026317092309513512\n7.0742153733243995\n-6.93828628922847\n-4.959653444205738\n8.01007216655088\n1.6859904368938694\n-7.583259683054706\n-0.9019830498380665\n1.6000041076689575\n-5.254199270572566\n-6.479593624852225\n-8.335647207348575\n-8.315294195923501\n8.123793814334448\n-1.42554122585826\n4.376831532677579\n4.283999057958356\n1.7650349559064393\n6.952119971961932\n0.3423711671709406\n-5.41206118236762\n-5.913839204974531\n9.581092180051014\n-3.5884144537547913\n-9.872699870114587\n6.513922113532258\n7.795462753876718\n3.070472395847399\n-0.0555468117749891\n6.820978733332542\n0.8497500463217866\n-0.37160458998981793\n-7.7264656363505075\n-4.683258976892686\n-3.3211884177534645\n9.443219885075962\n-9.25417868615223\n-2.427492598747285\n9.472749667218356\n4.14500456022475\n1.76413117193162\n8.719356760696694\n0.3298026926771125\n-8.274949787179999\n-7.506095437752438\n5.1887289502670475\n-7.437803547096253\n8.111162821271169\n-9.286286631494674\n9.901291460043655\n8.301106441725059\n-2.6765051412773966\n7.01513800598862\n-2.0487776944274594\n-0.15079643009050514\n1.4529327448857887\n5.7631402918153585\n-1.424747330788907\n2.781879020637752\n6.67929717759792\n-5.427518524099826\n-8.503632529511425\n-4.024852983857594\n-8.417500802542651\n4.593441938943248\n4.971717567247742\n-1.7066203893510434\n1.2265487097639283\n-7.681369868839047\n-2.311523351682252\n-9.616254274618775\n7.8112434741843995\n9.450620786834637\n-5.7588229025129944\n2.9887850899998347\n0.33906628139019235\n9.980147639228296\n2.4598214955650732\n0.9823421166056656\n-8.617841665959167\n-2.0440998283011025\n-5.94797975665964\n8.32441381645353\n-6.0483361570577525\n7.660060500817389\n0.9307975208709585\n-4.574689139440982\n-1.7268945652326173\n4.294653715023971\nneuron\n-4.3503017958224754\n-3.7790480928738512\n-0.6128103152905595\n4.821180050979724\n-8.8609112867144\n6.00123166848161\n-2.0159387569816456\n2.595510973668076\n0.18339274942597017\n-9.314137404326523\n-9.011156482866367\n-5.838880589064228\n-2.764044246718842\n-5.607538699416416\n8.10912451027546\n-6.7209440717523306\n8.440936035057632\n-7.367112055404494\n8.989418191080405\n-8.055116608103043\n4.339791445112741\n-5.351276356175692\n0.10274940959456691\n-0.780658854030083\n4.842862035277435\n-1.9211201351989105\n8.22907662579622\n-0.8562622777415152\n-2.8616144582149605\n-1.2857622909146782\n8.34425116263968\n-5.861279661306995\n4.230288639733015\n-0.5397170287508546\n1.8022123332544315\n1.3481315007631833\n-0.23383909008509507\n7.0305597005850595\n8.529253356462023\n6.889063041788677\n-0.8358032396328907\n3.788399046779616\n-7.817411523025449\n-6.16604140649547\n2.2831599445224837\n-2.7749603076452756\n4.757850972456776\n0.4973243961565088\n6.096105294654562\n-7.514915852012822\n5.180981231460782\n4.922044998153014\n0.7535407816862372\n3.739916567403352\n4.519185064080638\n-8.310491557812604\n9.274494080570594\n9.961584914804106\n-3.3369130401671487\n3.1823060069426923\n-1.9785050575794072\n8.241860280459235\n-5.258283512043902\n2.452127139264373\n2.3333321090694192\n-3.4295974679228047\n6.834914727343724\n6.717583184555815\n2.1745352719787014\n-8.13007300741658\n-2.492997037977298\n4.897342220652902\n2.1970658256029174\n-7.610749056407804\n9.34963978785813\n-0.7423148645302202\n6.01889107557483\n-9.54854244827259\n0.8523284879976223\n5.013185438983432\n7.739982463943154\n8.60952255415073\n0.0015690888443131712\n0.2643242968079784\n-0.6892026908430404\n4.505120147384392\n-7.8749851034958285\n-7.5627959948749135\n-5.7390049915700985\n-5.473436638636877\n4.82416679849165\n-4.05812556519213\nneuron\n-1.9520456405719666\n-9.759696651750884\n1.851254850734001\n2.818959345433729\n4.621799533205371\n-3.9078044242796883\n1.2272737573760484\n6.7877932364583256\n-7.239396601929073\n4.337171612265712\n-5.261354540183126\n0.0098200968812856\n7.502801106317422\n8.556307480479912\n-9.665552330737253\n-0.8341290763227716\n-3.6234211484661727\n-9.432401307076432\n5.34351842734525\n6.9847888154166915\n4.851339920659634\n7.285948317245879\n-1.5146050471115347\n-0.7428878372849113\n3.648740573564575\n1.7204555286887646\n4.430300984724271\n-2.9030776816825976\n-1.7405597168357723\n-2.530738136333164\n-3.502135912115123\n-5.321274504256619\n2.701068372495168\n0.4526661114099051\n9.682165824409827\n2.337303032017013\n7.256819843328104\n-5.847886475874073\n0.12856295951968022\n-9.80102398521635\n-9.409216820327554\n2.209438372402175\n-8.9983848453194\n5.806977255869581\n6.709179439439943\n8.69028076052238\n5.455045135927612\n-5.897069361553937\n1.6949127931431218\n-3.6223474231465014\n2.2980751616282458\n0.4486975143453864\n-8.892756976326028\n1.0204728408859953\n-3.512117551216414\n-6.272486147028284\n8.009025676254373\n-4.79646095525069\n9.336408782842193\n7.082904322901619\n9.053836280869586\n-3.291057520969991\n0.7662807675510064\n-0.08829888094743943\n-2.8731678369792446\n9.096203425227758\n0.4482224403381485\n6.678423863434444\n7.36135448602059\n3.579917131983492\n-6.014639342639181\n7.413369558734781\n6.210164937311793\n-8.888160814182411\n-0.6691857429428016\n-2.710654327777191\n-6.098289014187499\n5.891253922226818\n-3.789637487890809\n-9.668440023241844\n-5.987951082254548\n-6.676326539865554\n-4.825769260938538\n-9.486615970856256\n-0.9659638201083509\n-5.396473595892943\n7.016692440392052\n-1.5707885680451183\n-8.839429918022944\n-1.0351008677200335\n4.068153309595372\n-4.177361786168232\nneuron\n-4.755403240962468\n-3.0619092980785134\n-0.8277823445517685\n1.0800327316123148\n9.399054160644912\n4.075552512230656\n-7.008973534114835\n3.0845825918232594\n-9.946084050349079\n-5.489176209943949\n-4.303783610356511\n-6.949266490667343\n-4.386984919639467\n-2.8783461161338963\n-6.257982218650278\n-7.874660246834337\n-0.5587896156432359\n9.396434274917345\n4.714736307511664\n8.949379243888245\n-7.769573017688256\n3.564347060718265\n4.121106405362309\n3.5437406900503055\n-2.0209936262083694\n-3.3362908510648692\n-0.41239095970369677\n5.63182458591416\n-4.293012034420234\n-9.489397367017581\n4.175093420635472\n9.955760405330047\n1.1280601076434138\n6.16734055294091\n-6.979069222522947\n-6.8110576278462664\n1.6553398560372456\n3.2648468120770624\n-1.541757516259894\n-8.074770542540463\n-1.1708927069323294\n9.218458574705979\n4.7619191992048515\n-8.773517037414658\n3.199993641306915\n-1.6575258228092715\n-2.374299061121863\n6.170660625174191\n-3.4296288246425055\n7.229092001360526\n-7.349550730863275\n-7.281807678067294\n-5.213537538266291\n-2.179595981355895\n-9.376171203219466\n-7.352499560909069\n-0.9123106783793111\n-1.0599998127942167\n7.82869425527929\n8.169026683175812\n3.670423239444087\n2.7774436944905734\n-0.9641959517584953\n-9.039876507789707\n3.0254535703487218\n-9.096833254058257\n3.5840319032355272\n-5.173151169589014\n-1.763753980349938\n8.696813286263767\n-4.4853391373853135\n-5.957670633415817\n-4.1213672442653815\n7.104154689512705\n-8.62683933319024\n4.684702828598349\n4.070624732392252\n-3.2771574505568224\n-2.0462341010393725\n-6.635347400122386\n1.1240078429051192\n2.6987683171222288\n8.50818578712655\n-5.522431540883823\n-4.387304439425863\n-5.250242248159564\n9.530521243402621\n-3.359297339608305\n9.887549022203002\n3.8817197408033244\n1.2981906598268589\n0.9641259423367532\nneuron\n-4.1476363656808495\n-8.755333300366686\n7.217642141802805\n1.1237609170478913\n5.9552319858213565\n9.152516431061244\n-2.4520078365804454\n4.218161699635696\n-2.280339453126894\n-5.205351582628188\n1.6680699914783914\n3.699218681314127\n0.46540078642846705\n5.222710615619741\n4.083638445863896\n3.6178227711041044\n-6.222025044872444\n-0.8056168067265523\n4.7681475363944585\n3.815782202804743\n3.6391254792868266\n4.031888707486937\n-9.41690037137368\n6.917295875765374\n-8.526985720646866\n-2.1022309898523073\n-1.565848888212249\n3.5379354138981833\n-7.231423273561923\n2.3743547075689397\n-7.71225773772938\n7.925579243255642\n1.9885681207514816\n-0.2992289882803978\n6.895297603938748\n-8.800312246862523\n3.645040035143998\n9.617572493709904\n3.0065341560725045\n-6.681428818259505\n1.2298768322377107\n9.387949966597315\n2.480287436350135\n-5.676333785078631\n-3.8046259746107602\n-6.083370204039706\n-4.844847405065142\n6.40046132033302\n5.071781595897202\n-7.245817902028242\n9.49377482695807\n3.179738924701412\n-2.8149495542876135\n3.6554689024675913\n9.524866649234689\n-3.2886561548964655\n-2.4431290867023847\n3.7866951595693865\n-1.2183811286280255\n-5.700512015466193\n-6.906506243739326\n4.533522882657208\n-8.199127405273218\n1.0363434937792748\n8.768919309540157\n3.476322646987502\n0.036434893440504545\n-9.706616040228074\n3.504729859680915\n3.877937162618079\n4.742082080333391\n1.9513186410481675\n1.8651173936813725\n-4.428626012879646\n-0.8529381204688935\n-3.3305558231364896\n-2.6054130229662453\n-7.550160008853979\n-7.846501884572734\n-0.9382663526543311\n-5.311874516458781\n5.564790444207512\n-5.684298015023028\n-7.36100245568222\n-4.521815462142884\n-1.3753153618661718\n-7.84255424630707\n8.366147314259502\n2.8378091598444843\n5.154668826049534\n-9.372787022442706\n0.598750969862929\nneuron\n5.010370304980105\n-0.4959278821463453\n-5.576598843277322\n8.626204119309005\n9.200979703148764\n8.387930442308251\n-4.30072848158156\n-4.4772573819071955\n-3.663958868949273\n0.7009591841334428\n1.3226957870200229\n-3.7743410803052146\n7.247316439095504\n-3.5617050314157606\n1.4942173347105991\n-3.499695864286081\n-9.311085952505229\n-7.438678228488003\n-4.264608117090494\n3.877425007308657\n3.3614675002140815\n-8.922399735635976\n8.036292768768316\n1.2579397288322158\n1.5103360119734344\n-6.384939824629945\n-1.5870053791043337\n1.41617417515\n-7.6320653422608125\n2.075054296390082\n1.9319323909442288\n6.640966161845561\n-8.813655057847566\n1.7890025447006974\n0.9183831425755007\n-3.2293037493247523\n0.5038301264974798\n-7.529260517167399\n-8.336086978959882\n-0.4162360595633441\n-2.8470596793691416\n5.648232115600596\n1.6893495232191813\n-9.575126595737693\n5.515506892898685\n0.3782270608630034\n-2.4085891792587133\n8.092928858084106\n-6.883821384309677\n9.735879287978591\n2.3171693313036856\n9.15542106645933\n5.479916027730707\n-7.862737847237593\n-8.889025089269682\n2.8249397293224687\n-9.447035465411162\n0.6161401604020922\n-6.039790670731595\n-7.242503238393141\n4.866978220124456\n-0.4552008498136173\n4.804600173391231\n1.1142808821943473\n6.478712264620912\n-9.65568080880562\n-6.485161108960186\n4.785974565091933\n-2.0626765191823826\n-0.46921572882679063\n-9.079015925377936\n-3.0203039421532263\n0.9650142797273964\n6.52467737397304\n5.335394343991984\n-2.0379477958209513\n5.280075810824019\n-8.614512814558243\n2.5646808084712758\n-8.997307558524948\n-8.06482662758694\n2.0739213810124246\n3.3375900662569458\n6.499262978762443\n-1.962521739958809\n-0.5478272411843066\n3.7607356757196886\n-8.79601023592505\n-0.5772342546550147\n-6.178144907521634\n0.31766908347446776\n5.224904503487058\nneuron\n-5.979753231387203\n-9.91035393219217\n-5.518056966131217\n-8.497925680422988\n0.9224848574382505\n-7.55059401961542\n0.15555585867506716\n-4.789538797776817\n4.331680204441399\n9.073533043971764\n6.1936474879874375\n0.14853802711113584\n0.5789665771995822\n-4.590425477525814\n3.1722278931428516\n2.8042500417876903\n3.5052414069858884\n-4.530321787951806\n9.109645854748244\n3.4511693041018043\n5.028847100557147\n9.470315098130047\n-3.7882922001571195\n0.9613485201506866\n5.760220108644322\n-4.291211126257828\n-0.4605514180842296\n-6.615676042824599\n8.735234239318908\n0.4901664139491624\n-6.430751321883347\n0.6974521852604898\n8.402217797813126\n2.8207612742833965\n6.450399775243789\n-3.2938113362611254\n1.4345971713716632\n-6.988725494691856\n-2.8705940159098797\n8.559533140741127\n3.8292153503335147\n-7.88114429715598\n-7.336740526721963\n-7.961301362637265\n9.8180468804944\n7.777915732372451\n5.652429276126998\n-2.2992158416807396\n5.876614108981533\n4.843564284835802\n-1.9991253796644703\n-8.870200662984946\n-5.761481081176896\n-0.41944750784854046\n-5.166115145633059\n-1.1949498887229004\n-9.950853021209774\n3.90637943645163\n-7.726762673577625\n-6.314470175474261\n-2.2698121347811906\n1.6386228705775685\n-9.716963302546773\n5.829057923021653\n7.166043694409973\n6.102694958821486\n7.4448073221795426\n0.5817117799168869\n-6.105532954203008\n3.1494839498586558\n7.249606926192557\n-8.498872059655005\n3.7166001096655\n6.727548982218632\n3.766812382535909\n-8.21655772306194\n-7.762623568589831\n-9.824847434973915\n1.3546854536265918\n5.900522612729069\n-8.78334621176299\n-9.912780002847082\n6.33538111660112\n4.906006029307511\n-3.966011545578225\n-9.980685431643497\n1.680254618277739\n-3.010002529880962\n-6.096785833209362\n4.996833763687951\n3.4221873794808455\n5.4921683947212525\nneuron\n-4.235696363489227\n8.65904263421056\n1.2334493343419783\n-9.332273658000275\n-1.1866548828015278\n0.43106796110176093\n9.787279320283528\n-8.054428169107803\n-3.8187768120270404\n-1.6718497173155678\n0.24423562080045924\n-5.8886158718916075\n-1.160895996561102\n-6.313042874411236\n-4.02025528691847\n0.054669328706078435\n8.917306480587452\n-1.7157440151765324\n8.93337652523262\n-8.014734056734934\n-7.9474878817134424\n4.409734219641108\n4.184294365693422\n-1.3621546077309699\n4.178643886303279\n-3.200206726916983\n-2.6458592923112545\n-5.107044711946815\n-8.504190094598531\n-9.202757052548126\n-3.9296750333304398\n-2.0128193605728284\n4.763588694136129\n-2.5962946403141274\n0.15194575162770896\n6.9798896287123995\n-2.172058035499076\n3.9282602954678025\n-0.6644864110229642\n-2.1956462629163465\n-3.9205316778869514\n-9.714702368831997\n5.733085876040316\n-2.240868426947493\n-6.109262754233146\n-5.399837054466488\n6.331837146206958\n0.5211430228229674\n-8.87473632475065\n-9.651095748804252\n-3.694949789837132\n-2.041866489676698\n-7.569353486867905\n7.354796946068292\n8.63492584740938\n1.5602613336600912\n9.78589462956933\n-9.136348178446212\n-2.4949239191524097\n-2.5443634449728925\n-9.802055126425717\n3.6808468983966947\n1.666060396808955\n-4.971236096711717\n9.59949417350816\n2.8282374800017163\n3.989713667409025\n5.933585510561798\n3.3131249942231666\n0.9443677599615041\n2.0706958236315076\n4.842146064228736\n-9.030916395093769\n6.039786687558697\n4.878948834417836\n-8.719444489010389\n3.3148542196060005\n-7.392015730905501\n-9.789111003125612\n2.8255064644665207\n-4.146500970159519\n-4.926893662137322\n-1.641727537059301\n-4.7766228140817795\n-3.3281908701020235\n-8.550077972080173\n-3.108345270302464\n-5.29098007563003\n-2.490405388687358\n5.725224635396127\n-4.549563175164257\n5.593546433747263\nneuron\n-6.215989876671979\n8.967496259019489\n-1.8509940552010917\n4.186120043892069\n0.9910021665242374\n-9.590447937546216\n7.994603470470225\n-6.36024769551907\n9.592142652160582\n-8.684333508261597\n-5.158868801775829\n-1.5175746304915627\n-3.4117481345688305\n-7.8249470017110685\n-7.377300948369891\n6.926821269714654\n8.943499974019357\n4.680625863021463\n-7.242877533942016\n-2.590206152646972\n-4.965328695836522\n0.0840089812280298\n-9.129097320188029\n-3.3339764010852457\n-7.086496268493376\n-8.273120488883896\n-4.757472546583439\n2.545208860394672\n4.99805776106768\n-4.896322176966679\n5.007993027238788\n0.3268206218062897\n-8.164128820883885\n8.23141713514625\n-2.213363926549179\n-4.659963665114104\n5.585768049588964\n-9.198647395945244\n5.1208988724385085\n-1.8818394877381883\n-3.3121592087758245\n6.521215285099493\n8.166397658050402\n0.48394508732755526\n3.4674775190144524\n5.8434042630924665\n-1.6355295326326336\n1.484652435955518\n6.005898460041963\n-9.937650031839295\n5.0011949766603685\n7.5257467535124745\n5.804612850101614\n4.7820024012109785\n3.0860839896134995\n-0.02709220546350366\n0.9321852135345376\n-9.083883569346607\n3.440192691882016\n-2.90813279799776\n7.326254734102424\n-2.03073329066632\n0.7609466989683145\n-8.968327241805126\n4.455280205165863\n-9.53732712930655\n1.9682675269698868\n0.1278491561584305\n-9.000208032606842\n0.34570647484672756\n6.962108479004161\n4.942332183195976\n-3.480070165488658\n-5.429320563803834\n7.55794911942796\n-9.369584596921143\n-9.78933091587772\n-1.162594645160393\n-1.5526141071178667\n-5.842722454883253\n2.0860045666558835\n6.042743110334947\n-2.5832899473410365\n-9.193487536221488\n7.9910488208332815\n-5.248792507628471\n-6.689717254508498\n5.184509052162363\n-0.5507806573664964\n-7.230899953546395\n-5.638051927140591\n-4.180167512124921\nneuron\n3.149975181426543\n9.472331305629549\n-2.9506684838425357\n-1.3838372363525875\n-9.32192211019768\n-7.912858859276188\n-0.42038366527435533\n3.8142155165158886\n-7.807457816512855\n7.775640041817504\n7.611486418288809\n4.2218060911128985\n-6.33081040152824\n5.197141463980932\n-2.689473124915116\n3.3252536427833945\n-7.6732192907995405\n3.466336666620604\n6.79513752933399\n5.6629768296533145\n0.23506802766824597\n2.716024797870691\n2.3273584206011466\n-9.147418533945654\n-1.577174985983012\n6.3094438079935315\n5.8368780864420655\n-0.12342414163125648\n6.042340517411975\n-3.5815115922366747\n8.536628130889916\n-9.214680120462164\n-2.462516245396531\n9.873270524821987\n0.23422208573903314\n-1.4968712433829046\n4.677627077628596\n1.4914285462362797\n-0.3799275136898639\n6.685336355393623\n-0.3060370287892722\n9.220951392063373\n-2.052987321221511\n4.366365834906598\n6.314238640268551\n6.343428400292583\n0.8470717062708544\n3.280726343933238\n1.1314438345316424\n8.130119667642075\n-9.116424309173084\n-7.319789963175387\n6.383188247518561\n7.013325779928897\n-2.3701821967304526\n-5.378056891958396\n8.480596829509185\n-5.566072346356266\n2.1222193205289996\n2.810877507086915\n-3.083972736350775\n-2.7106987867450427\n9.964580114805898\n6.900824922142219\n6.475305572316399\n-9.662648126305275\n-7.153313213301262\n2.900296299814469\n-5.0911879392051285\n6.006399510814207\n3.9027619677194436\n-2.7259118445009856\n5.8371551895071345\n-1.73777176836456\n1.8849770222526274\n-3.5899069504420877\n0.5601366578631151\n2.0153097660750507\n4.646988664757073\n6.268798220093144\n-1.8511594597118086\n8.552856889539813\n4.984865047116845\n1.3975628979691845\n7.348486568540709\n0.19603450585304438\n-3.151262234441443\n2.0029734385753573\n8.659599816627717\n-8.865425384981151\n-9.082517409896948\n0.6167554945457421\nneuron\n-2.7047598369167924\n9.912279659019314\n-2.9693072943217724\n-7.470092789272053\n-6.326897686463633\n-1.3213342854042476\n-1.840216157956296\n-6.9573012145800845\n3.676021941330263\n-4.666014580261688\n1.2989568638876392\n-8.664346049517315\n0.850641867890316\n8.691881698194546\n8.925030976955302\n1.616075848326246\n-3.7174096245778765\n8.981376427308598\n4.010494910672293\n4.17911547449952\n2.2358629303254185\n-8.044937080006944\n-1.840511298310794\n1.8980511598419003\n2.4632699265907365\n-3.1253179073615467\n-0.9874700833210914\n3.7095533337688558\n-2.1617565250351456\n-1.3893092457978695\n3.7061536401197537\n-9.170674779319\n-2.970895825856157\n9.504935143664694\n5.578033996147318\n5.476143247686793\n-4.582809082017234\n-9.596521689809943\n4.296217880424709\n7.582138176824877\n-0.9457837122936374\n1.5875310897285777\n5.456321314477474\n4.075740874237093\n-7.8591594340163\n-4.879858272619018\n-8.64134408326867\n-5.060274253181505\n9.080408091499933\n-4.252447185632137\n-1.0908051957576737\n-9.474315149789982\n-7.952551917853842\n6.134156701878004\n7.237973037862185\n0.16468890462520092\n-8.685667276491468\n5.692572024067721\n6.355218544689323\n-6.713939363333741\n1.0867160255324881\n8.654939852649242\n-7.059914719748437\n-6.685488027733955\n4.594704449392005\n4.473305903849505\n7.00448035152985\n-5.257357639733986\n-2.4912624561797547\n-1.5463459693980353\n-1.514886602585317\n-8.565261486160887\n-3.6543095401425663\n8.210960202669412\n1.2166207060813217\n-6.533353012308913\n-4.797911470842562\n-2.9147925545718634\n7.367856830662529\n-4.652214397720115\n-4.503073371738051\n-9.552226457116703\n-4.2232203758724545\n-1.4845049382872477\n-1.4011545804883396\n-7.022506535300348\n1.491802510899296\n-2.4456243349872553\n3.227804719246399\n0.045496172240997446\n-6.928231380844796\n3.161169618949795\nneuron\n-1.4085835392983181\n-1.1578724349222314\n4.71148169040503\n0.6964432791602482\n6.983370598352154\n-5.412561221209648\n0.021226980076074486\n5.807538361451014\n0.4958101528514969\n-0.23347328993187366\n5.7537224280800325\n1.7742830259717413\n-7.099696842007381\n-0.6327002521296721\n4.386418117175575\n6.313876037696726\n-1.05424767067684\n-6.506386566413747\n-2.0668751420115172\n-3.451741242028614\n-5.6196110461612925\n4.626163543436008\n-5.2520672092780085\n-5.866703723346392\n8.141452262916943\n6.056899507087783\n7.609065614088002\n5.938984600595143\n3.8009075408599746\n-7.300949720781881\n0.6610694712938447\n-2.2081903307159445\n6.003783849244413\n-3.910602048895533\n-3.190691408702613\n-4.3389260345439755\n8.717749777703643\n-6.130643281161479\n9.69040278809032\n-8.416790996765503\n1.0394366312526926\n1.4803019697618636\n0.5896344221105965\n4.867937255740788\n2.1040897113193058\n-9.475361210218276\n1.1553256570683845\n5.646483725278517\n-1.2291470367665247\n0.15887253231057885\n4.547480519255109\n5.454356628635653\n-2.320407827098232\n1.3876071549101554\n-9.874553491552525\n0.9929630634289244\n1.3686823605696063\n3.804492802739554\n-3.4186192881033306\n-5.225900928266654\n9.30940864018801\n6.287449320579195\n1.3060669946087722\n4.15324379131931\n-2.886353013274876\n-2.3945671513061217\n8.188448675293017\n9.357232627007683\n-2.3394598292596336\n-4.7616141983162\n-4.392614066216569\n9.844646211279926\n-6.15929317538887\n3.358866970937071\n-1.2769848681874185\n-1.3583245003152666\n4.984300703944459\n6.651735889961983\n2.64875379232677\n-5.75391582607784\n5.9510495857468\n7.459755100601512\n-7.778945063412239\n-2.3989877359710965\n6.929851046041307\n-2.8766485951777243\n-6.371923008724442\n-8.266276033719539\n9.908664537999378\n-7.1670988639444495\n-9.16112462199523\n-7.318794666561487\nneuron\n8.716728959754505\n5.668244736354557\n-2.183393464756531\n-0.06075880540362677\n-1.8848787590867855\n-8.538063672225572\n-5.580206516658183\n3.4439172265055484\n4.58275713003964\n6.7234854541224\n-0.9975184683060823\n6.848035703740045\n2.4377332849152133\n-2.2311782496487864\n8.88408772614222\n-0.6085202510208543\n3.6315306385798563\n0.5791497731524009\n-3.9922420158623306\n-9.672864434291\n-0.753596302956876\n-0.3189490853051624\n-2.8690321793048357\n6.186384586936189\n4.710408529541907\n-0.014008694306328895\n-0.8410732183625735\n-8.830099616630445\n9.204197806404306\n3.955973704006297\n-6.073003686108707\n-9.694334202661024\n-7.092748378953897\n5.217712428780494\n0.7755265699728686\n-1.501322574538011\n6.072648590947218\n9.344605522169772\n-2.854672483091778\n-8.486195795090094\n-0.027462398652773334\n1.890710370510178\n7.18623621058065\n-3.1101864328139595\n-2.834017832707445\n1.310451650043527\n-6.808149510488333\n5.5302376647217955\n-3.6391084592268674\n3.197988777791052\n2.378337049370698\n-4.281928889830498\n-3.585370972748285\n-5.533270457334137\n-4.325272102529654\n4.96760717702964\n-0.07328568746758579\n-4.676008083904868\n-1.1321357886382821\n-0.14053822366515423\n9.8986127004743\n5.954901311239595\n5.657345291454858\n-0.432678158937585\n-0.4184993781136237\n2.2578831833463586\n-9.75986382922487\n7.204051467635648\n5.006145680563312\n-4.5223957471934995\n2.6492275928366427\n2.579582124390125\n-5.670694671448486\n2.0820912492188026\n7.525397405451311\n-7.871527115655184\n3.4097754801868496\n7.4339885751121155\n-3.576764660948093\n-0.5907052346224528\n9.025259448528313\n3.003626405109616\n0.7052778273302218\n-0.8078120728725624\n-2.215953758719167\n9.373041613644455\n6.850475782298506\n-6.688692945122893\n-5.504759208610892\n4.9421936320483635\n8.092095278995135\n-6.865001612655661\nneuron\n6.638551193923794\n7.876965157764326\n3.410790261185739\n6.565731217791841\n-9.964671885404215\n-5.134443702314857\n-3.544121749079394\n4.24815550589928\n-0.7821108716750547\n7.767690095489019\n-1.8673870230603629\n-4.604081535336075\n-7.60667988468994\n0.002606286301225502\n-9.563863416854108\n-5.642668715638277\n-0.016550578048579734\n-4.892564509370567\n-2.9209956301150797\n-6.739437587556864\n1.6237156447477008\n-7.0177478402552484\n9.789019564867337\n2.629958497469136\n0.3558279024863964\n-2.0716660248203156\n4.232696238151917\n-9.280241523410425\n2.7339591878382863\n-3.549652426799512\n-9.898156968841306\n-3.2691277797821394\n-3.20333170369707\n8.490920711756287\n3.6115184469828066\n9.189552992974564\n-7.507713855380464\n-2.0079347932654845\n7.255486413232002\n1.2727282465393452\n-4.067276101781463\n2.4432283891668494\n7.866930393634788\n-8.788529381189802\n1.6168404652670665\n-7.945973131775135\n-7.882587632392511\n3.619618043554862\n-8.89400434451738\n-1.5384424036919198\n7.824275500900308\n5.920995736729743\n-5.030550831733887\n-8.190073807768478\n2.360471149756742\n-3.219133756508914\n-0.6677741438112372\n-6.226827795057996\n3.8711890961953155\n6.836587409531121\n2.057863492571186\n-1.7453996585874432\n3.944698805175857\n-7.774435452338999\n5.0731997578555\n-9.381074300212571\n2.3274239809612896\n2.930529621662563\n-5.384841225717205\n-0.9528722448498872\n-5.590160672559438\n-6.965554637403592\n-3.5040295839241797\n5.201771847714105\n5.880432127265866\n4.266799632159996\n8.877454459275395\n5.963657792712569\n1.196371228091726\n4.4459059179013405\n2.9035967112703975\n7.160288584627949\n2.6460139056404786\n-6.302483038952563\n-9.637235201322783\n-2.476358254579476\n8.277632125428502\n6.300675867883728\n3.126864970607406\n-7.541758352764607\n4.307949092555418\n5.846558871863277\nneuron\n1.7481923720133818\n-4.427564263313153\n8.876575663609184\n-6.1939215144807225\n-7.604911780790475\n-2.6245969256701795\n3.4006652656415115\n3.852740788866804\n4.3946165052022845\n-2.173879955837519\n9.52617553671267\n-4.255933016227907\n-3.499166279212862\n4.519366100734086\n6.417819607822974\n-1.1746808708872347\n0.008616440329811681\n3.5455368180606683\n-2.598379925473031\n-3.3698584226468897\n0.11437052226701327\n-8.128464531658047\n-4.857228075033603\n2.322704368750168\n-3.7054099171653943\n-6.783927148965505\n5.726832144245821\n3.9914788826853487\n-2.4239482049295313\n9.943506348550066\n3.087655152744009\n-2.8859978113632145\n4.935011356612023\n-5.547590854749902\n-7.538438827915628\n9.222508942661012\n5.713290135573461\n3.1180861209717414\n-8.71168115895266\n3.8155977496425186\n9.211039076500134\n-7.145959548750396\n-2.365113709695812\n1.9215525682180656\n3.7027612111600328\n-2.947218480951541\n-4.659397865536925\n8.878795418209487\n-0.06170082197895388\n-7.929322674850741\n2.987548996607452\n-9.872501793587734\n-8.212441687010381\n-8.099769697942754\n3.2683705655075856\n-4.171847289736011\n4.743836834954602\n-4.56903534708152\n-3.7120675988587926\n6.168678281160402\n0.34049425308081416\n-4.389623992930918\n9.064468539217208\n-3.596177013242099\n5.530371284298303\n-1.5263265970684081\n4.519151639098937\n-9.991518100078993\n5.308298739590538\n2.822520074218864\n-5.311575137790396\n8.22706696903972\n0.763992300248677\n3.3111556653363827\n-9.320398601443728\n5.31074130708163\n-3.9387753278522997\n1.6751835043917662\n2.9524714652626116\n-0.6518441939978992\n-9.775077095086091\n0.3285213821661648\n-7.421112049897727\n-0.1078604707191766\n7.453927380159097\n8.813761441371366\n-9.608286451615292\n0.18972691396026198\n-3.919023589606425\n-7.421333660363105\n-2.843533433664218\n6.602144426752401\nneuron\n-9.991647650334892\n8.74291732122072\n3.2640856004690666\n9.676184691421541\n-7.942043145838447\n-4.887323890807885\n-4.303790624376589\n-2.3570707056948303\n-7.520299651397819\n1.7027537438004536\n1.9253375256935712\n-6.010682170269355\n9.492356226689676\n-4.174085534856536\n-7.264479889281505\n2.5543820441619136\n-9.488993981892797\n-2.8289742806960794\n-3.3410999208696124\n-4.3347985111961655\n-7.011854725164475\n-9.737088029308243\n-9.558375751471097\n7.275915402558515\n4.445070678296497\n-7.7317268098370135\n-1.143507383909248\n-1.9668562677413615\n-9.124632704665046\n6.589084179334335\n-2.6841895456929676\n-3.3781635118370446\n4.192974555115592\n-8.006222705387904\n6.566885929764545\n-5.188749422823005\n3.4356871036373215\n-4.684611993067351\n-9.742160020535913\n1.4494612720883904\n7.460434845461689\n1.7147936856464474\n1.4054731268544551\n-5.436509547771529\n7.617789009007538\n-6.431012966145886\n3.2163627716874643\n-6.090869203456364\n7.43701461990214\n-9.298375471902823\n-6.0388034662288455\n2.1837777559811\n-9.779173347231715\n-8.417308711995663\n-8.013140281366\n-3.5889976783878264\n5.916206068259537\n2.603517546407883\n-8.946729314735515\n4.21697278255934\n-2.9737309930007227\n-8.704371622340492\n-0.1481090932045448\n5.108393270522695\n-3.0148120616689944\n-3.8303002501822703\n-0.5758229619245858\n9.613242468880356\n1.2697261927867287\n8.927824510252671\n-9.327468773151569\n-9.161005743782301\n7.950108131125964\n-9.077651102136082\n8.686515628078077\n-4.823421448844809\n5.7850515260879165\n6.12243893751264\n-5.70630762173848\n8.35858168358397\n3.9610994754927398\n3.4869089372398787\n-2.924590024311111\n5.93368727841995\n-6.006023732452879\n-2.020648565330625\n5.1586238373260285\n0.20038740889312123\n7.1532229131722485\n-6.212192664027814\n1.1752552811542616\n1.3821983355176903\nneuron\n-8.264842212635788\n6.541591299848301\n2.7403307240321584\n8.204800957302012\n-5.304030077243449\n5.200887824922553\n2.63103741557849\n0.314648412139793\n4.282934491571881\n2.2166901316847176\n-1.3311051031630283\n5.37625062916415\n-0.5628897984424586\n8.849139869113085\n7.572041418247821\n2.770702145597288\n-8.179859960740695\n-4.834941474679315\n6.415015914608075\n-1.9037164958360497\n4.833625952259726\n-0.9082343618816324\n-3.387951897388697\n8.429113903653612\n6.993630621447371\n-3.850453724531233\n0.055652429568378015\n-3.705240516929471\n6.334396744614885\n4.980043015217888\n-2.7102477302602157\n-9.070791414117307\n9.212873120209277\n-6.211605943657994\n-5.13608700157717\n-9.360148918050848\n-9.472979354970652\n-4.505628420569008\n-7.436197903289572\n9.290506232971332\n6.2323362636292305\n-8.1704178448723\n2.6523963749025414\n-9.698813161711355\n1.2807029528361946\n-0.9400199774817586\n8.166242633145256\n-9.142588762584385\n-5.12410252779288\n-3.2811287426377667\n-4.4861104273884145\n-0.9808159072648648\n-8.625860163036176\n3.6262841275061497\n-1.6942176738905124\n-9.745644514754217\n-1.789918727345623\n4.8219400991819095\n-7.344641658668369\n8.006519544294587\n-3.7533262045261617\n-7.040916575179963\n-1.2454275115142366\n-1.4716250744440407\n0.5622481719235317\n0.1793779762693859\n-0.32082464976306735\n-2.597495219868826\n-0.4603853057826113\n-0.9887480757203981\n-5.189443412194215\n-0.523286267782821\n9.234642384974377\n7.898456732790846\n-6.745159810439054\n-6.601397230449136\n-1.5744350666219886\n-1.770686272682389\n0.1310133439676009\n2.8851807882489067\n-0.686668095331946\n1.6306575370181031\n8.051743660664307\n-5.225371251425912\n-9.679010459959077\n-2.950772621236588\n-9.32985734634065\n8.661139949559\n5.063436970612165\n7.605559138445017\n9.838386600298886\n3.9551603419709758\nneuron\n-2.4720940606498876\n4.0522060612078\n-1.85831709683985\n-8.643440142981477\n-8.397978499608097\n3.8128712133491605\n-1.0849267765658444\n6.593217589924755\n-2.602159285006571\n-9.372341759364778\n7.36974238438072\n-0.9839772758908794\n1.9837249664848455\n6.494333392041225\n1.6964614114544307\n8.132655102134319\n8.311947170034294\n5.438014735137228\n-7.6343667080256905\n2.9431220348727094\n2.632299969771783\n-4.219619097880409\n2.789550131411702\n5.719833841743929\n5.402992850564083\n3.5217473502430807\n8.342001302692433\n-6.105437060518922\n-8.542095440553618\n0.09095430223066137\n3.154350044441818\n0.760282477988361\n9.64786974950703\n-4.817692087701615\n3.0879074864591782\n5.957631535113668\n5.332604122149465\n7.252497987397383\n-9.184635262256425\n1.6779090892428883\n9.345511780141125\n8.630701963099215\n5.7499680610581265\n6.307376515448897\n4.939350856618265\n-6.019703803130662\n7.098915793101392\n4.604084818826739\n-9.028489324482054\n5.1799225901923895\n7.675286492847643\n-8.375997652310613\n8.635024800308743\n-5.609012048319107\n-5.426556396634323\n-8.71564493147234\n5.574007600727442\n1.672088868519388\n1.6683224460328416\n-3.5457758507225834\n5.190717957617947\n-4.619217494710739\n2.126423550672878\n-4.0497354460278885\n2.192222688281953\n-8.735392123983654\n5.239785419137046\n-3.5492519173128967\n8.153734822038905\n1.2589758152429065\n9.914308204571313\n-6.198137532702866\n-4.144153311988637\n1.5691099181350898\n4.110689369894254\n8.442741625299739\n5.026795010171099\n-5.788704356128516\n-7.054158652607048\n-9.268314496408683\n-3.130178604972953\n-8.860578771268004\n1.1480998298649459\n2.570192378051559\n5.269711153291416\n-7.522906121824866\n-0.8873876194483321\n6.849013595882935\n-6.459832405149976\n-2.4562445455152515\n-0.041176144954628846\n3.901554871447923\nneuron\n8.783987524164889\n-4.736480294787901\n2.7572004225265245\n-8.638939346697024\n-3.0327164180601596\n-4.576718056252361\n6.172610624852037\n0.9610959034419553\n-9.761108854850386\n5.534344221044638\n-3.0190801102920517\n6.5454892859726055\n6.01601182397334\n6.720179761127936\n-0.13405726293847398\n-3.798821827943002\n-9.59606195918894\n-0.16688113966932594\n-1.6222592271435277\n-2.13321355475536\n7.518978966047502\n-5.89015898986805\n6.992059269872213\n6.503816380078318\n-8.832020351019805\n-5.392009773646171\n5.960635866082866\n3.1744541427286888\n7.74444078791343\n-2.923627207614139\n-2.74020969074956\n-1.7774943024980128\n-4.407084520616083\n-8.224953704551826\n-6.760061970875446\n-1.5375432063537753\n-1.1559815474124169\n9.034099140464612\n8.311746719739803\n8.679999654298507\n9.464777335413855\n2.105973049788006\n-9.279269986171318\n2.604326204146099\n-9.091201489979767\n2.5158519471017526\n5.650435520935795\n3.312987275881727\n-4.580017779672774\n3.457593495838982\n-1.885522180005812\n0.20386982529235098\n-4.153939142795135\n3.5175227938040243\n2.168964495587229\n-7.304143909706711\n-8.923657762483439\n-1.044185224147418\n2.230251915359298\n2.8284291904310654\n-1.772179292028051\n-4.821340794674025\n-4.834484481883409\n2.281234888352921\n3.621433268891885\n-3.803832997298182\n4.074526049514581\n2.187245629213641\n0.5519695224630605\n9.364793482757044\n-8.984413325136346\n3.633763024680796\n3.1914288977718086\n-4.955193900387227\n-2.707038095980192\n8.831693889370456\n8.915359068111215\n9.139306618756567\n6.962868490068503\n0.050603884995712445\n0.7147234320910956\n-5.869997477510198\n-9.982458002719897\n-9.018632304658347\n-5.503854843249785\n-4.401544586882482\n-8.060405037829721\n0.597948663633554\n3.706503165398869\n1.3689255206182716\n-2.8591439205330915\n9.833519953204542\nneuron\n2.133783923935484\n-6.188207740973326\n-6.227837904349931\n-4.139517746799479\n8.77496644918609\n-8.964144064381907\n-3.827308620717871\n9.73382465524827\n-8.417807964406874\n-7.093835772311605\n8.453004726426814\n-9.183114521753922\n6.069593470351826\n-0.6179740229831099\n7.43784807909263\n-4.161018527146614\n7.639934941482016\n9.902412772259467\n-9.32680564009664\n-0.5099456548357617\n2.8937582694577424\n0.9621508503119469\n8.888119408722122\n-3.938537825627524\n4.955248959018399\n5.55920252697647\n4.53219582715527\n5.226028721074247\n5.6256730913107305\n0.6199934228392268\n-3.1787409124930943\n7.832718155471952\n-7.982797464627954\n7.375750828455912\n5.721652305993993\n-8.093910771113958\n-7.27564979296937\n5.70424495476991\n-5.945245733444857\n7.2682847709462965\n6.986613609369217\n-5.5569181390611995\n-1.234074967303751\n2.46546149353295\n1.3384705312941136\n0.6681718351822474\n-1.3810836724831321\n4.337369848431263\n6.375751123671558\n7.503907671753243\n-5.021469665050837\n0.7546983071084767\n-9.321301301862484\n-2.3841079185817082\n6.640865448673696\n-9.179551819121581\n0.5713125273352593\n5.455823787238721\n0.3066390417091358\n4.156872312647886\n5.23970511567436\n8.129310691555535\n3.7938710884253957\n3.8789630227904492\n-0.26630164853254534\n-7.202426857759914\n6.027518028828769\n1.5940048380645333\n-3.052076186876287\n-1.7561448667648327\n4.449013681419243\n8.854713277026407\n8.987764764808983\n1.3652902142218215\n-6.666098336553881\n-8.63269469385827\n-7.643581341947798\n-0.4497414892207674\n-6.957157409591201\n3.5876693862948428\n8.07837410325231\n0.18169105387520146\n6.950663000946413\n-1.134799634971233\n-6.315624226513609\n3.421753965891585\n9.088392518086883\n-6.914720064177131\n1.169102233880861\n9.218338444999144\n5.435571233425116\n-6.928753586341454\nneuron\n-3.9153643754772305\n-6.588007322367404\n7.690141300297739\n-7.805253561562719\n-0.18123669630871753\n-2.15351862838159\n3.6480061665206165\n-6.255126344034679\n-7.7621102915661595\n5.18573986174415\n2.6173948049800733\n9.809895207015932\n-1.0272444623599286\n9.681766497772099\n0.98999909279476\n8.532285019508581\n2.8139782636898403\n4.611546055714262\n-3.21223843642082\n2.6208931978218852\n-9.188637396404966\n-4.0242054286246205\n-7.425308923433141\n-3.8392367308286457\n-6.381981173484059\n5.281264535676787\n1.6240311082434444\n9.580436509218755\n-0.17596659024363914\n-1.4566742039084568\n-0.7606150608488216\n3.371463353392583\n9.436152531474466\n1.6280396333531422\n-3.459560102596675\n-2.147954540196546\n7.388884455327885\n6.2378636681158355\n3.201289587928957\n1.1552654576182175\n-1.739119574323571\n-6.7996241346554935\n-2.542993382651386\n-8.756787029212127\n0.10341964963121786\n-9.412012617624564\n3.2861885513827493\n-0.0770678323648144\n7.55623843011082\n-9.163306939058897\n3.8869233077634013\n5.823592901568322\n-4.259331338317535\n8.445954514336371\n-4.996973494834746\n-4.353661974010381\n-5.889029540098061\n3.3835657802559616\n4.332490836714504\n2.680313840921411\n3.6656273399176675\n-5.553359665408147\n-7.039220824357592\n-8.75285404610252\n-7.067326323432286\n6.112245375034602\n6.767669144230172\n-4.920340020530776\n3.365905361560557\n9.569399551961222\n-5.661866452976614\n0.3345525587876641\n8.911833670303505\n4.63037691889191\n-5.979057615317314\n0.054159992037143834\n-0.5295853497958247\n-6.46610898614878\n-6.666700869671757\n-7.380096589401443\n4.986164425880815\n-0.5068001468654804\n1.1605458499944188\n1.1589243708107122\n1.1186724800939163\n-3.491719337246062\n4.522439398526068\n3.4262283035831165\n-5.68976365647319\n2.013082015936569\n9.172031604134736\n-4.3685460321047405\nneuron\n6.631828613567167\n-4.454830800075422\n1.4395489474409806\n-4.407019036782833\n-9.930191250907077\n5.1041313488827385\n-3.5656558936340343\n8.2140717458305\n4.749126137509898\n-6.451924229957977\n-2.4191714673487086\n8.550209923387191\n9.401342576860277\n1.4079390266823255\n-0.532158476069251\n4.460029827032923\n-4.278995020995162\n-8.172016863948976\n5.8929049340394535\n4.401795965969142\n-5.03135075484983\n6.191623804173833\n-1.3847679582023353\n-0.5906157502780895\n0.6329451069226466\n0.6678090037438511\n-6.352373036255294\n2.3420674772443384\n8.87960639575387\n9.437030749530733\n-2.287679441470445\n-1.9314543491252145\n-2.894466834881382\n-3.815086316333638\n2.314296081872216\n-1.0522637861711481\n-3.7753508733410635\n3.495100810881089\n1.0758650382400359\n5.442192552394687\n-7.410836439788406\n-1.164117282613888\n8.894241742086923\n-6.509390297112354\n7.147249030199525\n-1.1439192179658253\n-9.94507752622428\n3.1432582200564663\n5.874749625936417\n-4.1537625462117695\n8.583707215354321\n6.255044611409668\n-7.922213235523994\n2.1611948200435616\n1.0937014603774498\n-8.595035066514932\n-8.844692111247552\n1.8746535259841934\n-9.15288644949598\n-2.6498703389443334\n7.206867662001737\n0.8042685737567945\n-6.045800616074388\n9.188009120976197\n8.855145427035275\n-0.1885188764001966\n-6.238826848276766\n-5.795381908229167\n4.530555404160284\n4.212839633605379\n0.4175618161030048\n5.103750616201886\n-7.870334693797734\n2.259974364872208\n-1.1084502364524096\n0.8853208265204282\n-6.15758836329964\n3.639555157487977\n-1.410712396574345\n9.102598869268515\n0.9873249554886132\n-0.3051124282878481\n-6.684926473277553\n3.2247310673800755\n-2.033311062132126\n-6.355600082031008\n4.25466645871011\n4.001655878991269\n-0.7173197955304489\n-0.9004871295917871\n1.7248578117798807\n6.486991394044459\nneuron\n2.0497243463454606\n-6.2741436144382075\n8.710530129521521\n6.594827096029714\n-1.7045767880478202\n-0.7732585561504868\n-4.218854216314893\n-0.874213769698986\n5.266417001075084\n-7.924156354037364\n-9.209981049006702\n2.7640555586378257\n-8.114069810783098\n-5.382051751632259\n-3.414891475081363\n-9.775379415552642\n3.39301642961638\n3.232648326044627\n7.817398303596259\n7.76008489722261\n6.0481473343811505\n3.1913151030499765\n-7.05197810899808\n-3.183710413778791\n7.5706938735672935\n-0.058071194224298406\n-8.106559287675537\n-4.245808906199535\n-0.3483069336122657\n-9.260859335139433\n-6.291389897123105\n3.714252283393822\n7.075348272211062\n-7.196368383928844\n6.701909540763776\n-8.361391191327847\n9.198163426849904\n0.595068064855393\n3.356599338129882\n1.1873440080920794\n2.007221527408456\n4.698254847526289\n-9.937717273626145\n-8.69690327641968\n8.221999847828297\n-0.35381230526443375\n3.497958177167313\n3.8861770279509877\n7.369384608870051\n1.2727854779101833\n8.229983394355651\n-7.428287789752339\n8.970554994023537\n-9.38733569288324\n1.3278673691659915\n-2.883955361207553\n5.0350249697039935\n-4.40155156124545\n-6.147957017301648\n-7.342286434236646\n0.17933269966308174\n-0.6155287714814284\n0.9013356081324209\n3.530297880588953\n-4.713747668374657\n-5.911909309762661\n2.5641464901593047\n2.4193533210753504\n2.423587529793647\n4.410760406833449\n7.898600856382854\n-4.922441836286662\n1.1446837030046675\n1.1353725342439636\n-9.267450681133214\n-4.115990746563305\n8.612070158427708\n-6.346454877852685\n0.6857495908863531\n-8.41324099261248\n9.725743881418685\n-4.42604437787375\n-8.201252159017722\n-0.8814266864602449\n0.3611411517735097\n-7.370926922546577\n-0.5515347549264904\n-1.4552562349357911\n5.643821131988965\n8.346406815403839\n7.667287943513877\n9.315690469874022\nneuron\n-3.5155194074783713\n8.023383932948223\n-3.1757527344670966\n1.2669739771963129\n-7.0190145162116435\n9.385727750986119\n3.8956500543571604\n-6.541877782684205\n8.348992469502418\n0.9467924565627084\n-0.6350480263453906\n-9.255838142114833\n5.063557134964009\n8.661382372459377\n-4.839973928305854\n4.897709686623992\n0.39399969609466234\n9.728585045501202\n-2.8644334815402894\n-6.247132470876524\n8.803981036599371\n5.969681858571006\n9.859329641907689\n2.900992608932409\n-0.9263401706201213\n9.615268781702838\n-4.163384125102922\n8.826139878996425\n-8.079270985279033\n-3.327035205161546\n1.0372570329966946\n0.30263804278323425\n-6.657315679542823\n-2.2124605185756274\n8.183527041937182\n6.7749707328330295\n9.718363151932062\n7.063675299625515\n-5.562015241562561\n-4.747772539887314\n9.328527386146634\n7.548541742415624\n-7.77398658806979\n4.912536887450896\n3.0255815481392756\n8.925177199536222\n3.2106071682246973\n2.2982361085202907\n-2.6358103198568594\n-5.382802963180069\n-7.687881461080581\n-4.43665548077619\n8.542796273991698\n7.072410764601596\n-9.115064570388956\n9.94900342669299\n-4.619784558154447\n9.313445413222611\n-1.628115897992315\n0.15006828594156252\n-2.9748754175798653\n-1.9147465977873845\n-8.167410801234137\n-7.335600495234782\n-8.445863548167335\n-3.6858520355135016\n-7.639983535231711\n-5.876857194763192\n-7.673272169635716\n8.053041958523476\n5.751495677869332\n4.62924029069552\n-6.1261157160612\n1.0137169969044812\n1.1570640347584682\n-7.111227463286973\n8.062113264392988\n4.888897002760673\n9.376107559621294\n-2.6859844091056373\n-5.319137195037092\n-9.244480122936045\n-2.907066499963804\n4.119575645804665\n4.4045328159518355\n9.146226836822963\n-6.800277416557641\n5.126590190569997\n-3.6831557534998227\n6.781950238886266\n4.350806626532844\n0.943070840395599\nneuron\n-3.638917542380833\n7.996690037062539\n3.718826296207942\n5.049272789426659\n-2.6597018756077384\n-4.026953010293493\n-7.204695652515419\n8.401106097983115\n5.35391356787734\n-8.23839848556059\n-3.0556500847676427\n6.99920060830201\n-4.227801207468039\n8.689812110819496\n-7.025187057665187\n-9.785607433777297\n2.825032727438501\n-1.5349332541589855\n-0.7695272677184373\n8.554882242687164\n-1.3625473186987036\n-7.056088408547135\n-9.018351997148562\n-0.19011629555425902\n-1.7913696748656194\n-2.8610171037118004\n0.4195297560301747\n6.4374749581195845\n0.5032463213082838\n-1.2411308059976367\n8.12336924086824\n-8.094538965417575\n1.2504540529711972\n0.6961583742592281\n-3.9344036256773274\n-4.331048396886494\n-4.747793935866187\n8.690482492008133\n6.585898723301751\n0.12579960348926944\n9.822744156885118\n-9.810483239380737\n1.3031417833612058\n8.330960511151247\n-2.2895953405524128\n-2.781362424088667\n3.327852608534718\n7.887704619319543\n6.816390867224151\n-5.144761021858722\n3.0274396550987603\n-5.236760559136457\n1.2657495148495235\n-1.3293148331582039\n-3.9212007032261154\n6.2611068379396055\n-2.9204890620535684\n6.105718250412533\n5.327934634174925\n-4.41475888611609\n-2.0664647190361274\n3.989097674389699\n5.68434767024524\n-1.9907883586030972\n-1.1739998264280382\n3.5421401579707834\n9.812644052586403\n7.162971179708315\n-4.344060730796297\n0.17881208887321254\n8.297041495555902\n-7.9693096454399175\n5.648122385830674\n6.66289280860952\n-8.262654752686473\n-9.732902003733958\n-1.7526286903162358\n-6.728776458745149\n5.720865968158728\n0.598992473889246\n9.684965778462482\n9.481636517648013\n0.025838148864756327\n1.1465852873397564\n3.726792950457707\n5.839502308059224\n-1.4819618436353\n7.728001249985235\n-7.986754029541343\n0.8183297815106894\n-4.486795772227956\n-4.788264829862154\nneuron\n-5.3943157988239365\n-4.782736377351078\n-4.699002408812936\n4.1106635968803324\n4.279228735690652\n-2.626414236258716\n-4.445192058613414\n5.188563378399149\n-5.069998765815322\n6.872642467938032\n8.742658203163831\n-4.676213230726411\n-0.2704419044680906\n3.105899766908111\n9.203186077069043\n2.61868972186843\n3.0982708170818896\n8.257008778997983\n-8.45167146059712\n4.272402656193792\n9.302585523914983\n9.08353180534874\n-4.666569389122186\n3.016011328134194\n-7.034676737014296\n3.180557634393484\n-3.3310757054733964\n-4.359353115401112\n2.397967447113507\n-8.605853352900004\n-4.309680701105158\n8.218470286140745\n-1.1511178537924915\n4.0386738717810715\n-9.976361604006028\n3.856754064503134\n4.834234075407107\n-3.787982082074497\n-3.9438449764517847\n-3.9354282564218757\n-3.8104440398702155\n5.828571615229743\n4.008175033086749\n1.721165884455198\n5.201672360723468\n4.330179503513294\n-7.826456553536277\n5.48735049466152\n-7.459045952050842\n-1.045071466636931\n3.882869367298527\n-6.424777357226665\n1.2532346491010604\n3.5310872126691972\n9.98756086271904\n7.321193925071086\n-5.433905156505851\n-2.418254160041613\n-3.7746701002887018\n-2.5030077942284\n5.269389591604938\n-9.13238026145862\n-1.1398618054847165\n8.720059937035433\n-1.356780878328947\n-2.321271963668994\n-8.821055905089402\n8.300828178663489\n-3.602284312434487\n0.24303000406677544\n0.21112876268238656\n1.467985701299519\n-6.699065297817697\n-5.453607589889011\n4.451406748522462\n8.6777496907084\n-6.238147442218853\n-9.195102887011725\n1.564167366794238\n1.2862393333866118\n-6.484371185943008\n3.4030112356942466\n9.094321508740544\n-7.403101384556878\n-2.2354834634305476\n2.2216042456174345\n-2.214856268204042\n-2.5281248892075525\n2.1062087923885664\n6.6839906675356175\n-1.578229362112613\n-3.5282873110533863\nneuron\n-2.4300854230730806\n8.5330159448668\n-9.609223077194917\n-0.7695158897355414\n-4.591163838381272\n-2.7612315027549106\n-4.970195358475915\n-6.334454250234565\n4.29120880192122\n3.961422132523731\n2.0157539229028454\n5.249547338674711\n-4.092259089460497\n-5.478887151377048\n1.0163048913295958\n2.371100692269734\n-7.816418620332801\n0.3857956605492241\n2.646282967616549\n8.985727351634022\n-3.3504460890290932\n4.784379316811995\n-6.952485899351406\n5.031700960765173\n3.16691862836884\n-3.0324040609907787\n3.542053558971403\n6.137363704929992\n-7.828993479090373\n-1.3013135347186733\n7.495208268660938\n-4.7123550823544225\n3.837492234782365\n-3.1603536316415437\n-5.9668932949538505\n3.3797096160143036\n0.9938168736812325\n1.6827406140888423\n3.883736244673508\n-6.131410980576925\n-4.304810582082053\n6.86988017364137\n-2.223573606671012\n7.096830988141396\n-5.153324272954016\n-8.109298495215816\n-8.897970895375591\n-1.8612638679047055\n-3.3814026876311942\n-6.318796274180527\n-5.509749613453867\n-0.45187836003363735\n6.1497490164918585\n-7.7875727236744785\n2.2346578036875653\n8.926879097400695\n-5.9910714856274545\n4.048423679957391\n-2.279745052138762\n-6.515012820233865\n-2.740796425478176\n-3.3795756610469074\n6.717839343672485\n7.983356158145494\n5.8037002424478\n-1.5879578612814438\n8.589216478036573\n-8.441788566668391\n-1.2852923646628511\n2.7755152601029076\n7.192731333774109\n-1.8365035974490929\n-6.344521301043377\n-2.088280032078247\n-9.497805354826088\n2.9685116616790364\n-7.350373434327846\n-4.175978999640099\n-2.327642399579517\n6.8555299310813815\n-4.8950635444960096\n-6.900625464921735\n-3.802573922213708\n5.190566974383031\n-2.4654998287261143\n3.518760805427701\n-2.1112430204992982\n2.5174931928042987\n-4.586325402241814\n-4.034068511843268\n-2.586750896911698\n-8.582652142676647\nneuron\n2.4451353183695668\n2.0578587825729966\n-4.832603292828239\n-3.1871419099270892\n2.620502308921384\n6.436183474165662\n2.8115228713879548\n9.651111722991264\n-5.1153755823002385\n-5.663188758369769\n1.4164190134055277\n3.1738309995475067\n-8.42906177665704\n-4.208661460889955\n-7.146301633971652\n-7.665683727423458\n-0.6764754759124636\n-2.524607706187687\n-3.241937988458403\n-3.7830214582605226\n-4.7522256884507685\n-2.0005113976299937\n3.5076558023158433\n-8.726001100040978\n-7.940650665628198\n-1.2655650438073152\n4.541187939278723\n9.6551155951841\n-4.829666021177477\n0.8077999967312066\n-5.56962295952202\n6.519954457641999\n-7.151547426301839\n3.3529329122440465\n-5.034619772832436\n4.999913660520326\n-6.742620240215298\n-3.2793084011980755\n8.157549973695325\n7.909093981787112\n-8.379410931144445\n1.3403210620864892\n1.5045494717832408\n-2.216818591049672\n-2.558221663680842\n8.02649809566277\n1.8935092084146876\n-9.678433438275647\n3.7030861556335726\n-0.777774076801856\n8.593563673965951\n4.163901568353639\n6.002531037113439\n-3.035147338942963\n0.9017184911857834\n7.291279651201387\n2.7566165831250733\n1.1632267058536905\n-2.8419598596541062\n-0.0069906800202934605\n-7.305486507290031\n1.2326524682611018\n-7.071312530971088\n-5.7783278548863475\n2.790380850847809\n1.6570531321187665\n2.2993244468554552\n0.4008382597462412\n0.3543960487676512\n8.773986745559306\n5.600416100169399\n2.9442009767265054\n-1.3001217394704612\n0.6770311777259796\n1.4785390884646232\n-3.757087415904621\n2.826283247049519\n-8.49978492974798\n7.873171001213715\n9.08393143804512\n7.265852733627536\n-0.5347668255990601\n1.219757116451019\n-2.6036295084401884\n-9.695418505377072\n-0.8880036298125016\n-9.835806978014999\n-8.099811216428265\n6.018690443129424\n-7.459791431869844\n6.935142290965746\n-1.178962027963606\nlayer\nneuron\n-2.674907192689586\n-8.842422646530206\n-5.105954486989082\n2.742564546562749\n-5.087827314115332\n5.302158416285547\n-4.3560336590967434\n-3.901899313595547\n4.115278614482705\n-0.5404893454305082\n5.467943648370344\n4.07018589326875\n-1.288075625139662\n4.059308734384892\n5.314554479123823\n5.951526810168217\n-8.72020590852201\n-9.176522622001965\n-2.3477755017542923\n-6.139863070669421\n-0.2912727211821742\n5.636571597217168\n-7.02146894935161\n2.9157617261089297\n8.73061302048641\n-4.149577501951827\n-7.316740269751354\n9.322934956172766\n-6.40554502654346\n1.5903178371289917\n7.180390813981441\n-9.371431068766316\n3.3665829603530817\n6.455668063340198\n5.137359745441588\n-5.581647599814373\n-9.974376285154849\n6.891846190133986\n7.176340404073242\n6.0782009356420446\n1.1361794455327767\nend';
  Kotlin.defineModule('checkers', _);
  return _;
}(typeof checkers === 'undefined' ? {} : checkers, kotlin);
